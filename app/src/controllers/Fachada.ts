import IFachada from "./IFachada";
import EntidadeDominio from "../models/EntidadeDominio";
import IDAO from "../daos/IDAO";

import Cliente from "../models/Cliente";
import Telefone from "../models/Telefone";
import Endereco from "../models/Endereco";
import Cartao from "../models/Cartao";
import Pais from "../models/Pais";
import Estado from "../models/Estado";
import Cidade from "../models/Cidade";

import CartaoDAO from "../daos/Cartao";
import ClienteDAO from "../daos/Cliente";
import EnderecoDAO from "../daos/Endereco";
import TelefoneDAO from "../daos/Telefone";
import LogDAO from "../daos/Log";
import PaisDAO from "../daos/Pais";
import EstadoDAO from "../daos/Estado";
import CidadeDAO from "../daos/Cidade";

import IStrategy from "../strategies/IStrategy";
import ValidaCartao from "../strategies/ValidaCartao";
import ValidaCliente from "../strategies/ValidaCliente";
import ValidaCPF from "../strategies/ValidaCPF";
import ValidaEndereco from "../strategies/ValidaEndereco";
import ValidaTelefone from "../strategies/ValidaTelefone";

export default class Fachada implements IFachada {
   private strategies: Map<string, IStrategy[]> = new Map();
   private daos: Map<string, IDAO> = new Map();

   constructor() {
      this.definirStrategies();
      this.definirDAOs();
   }

   async salvar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
      const dao = this.obterDAO(entidade);
      const msg: string = this.executar(entidade);

      if (msg) {
         throw new Error(msg);
      }

      const logDAO: LogDAO = new LogDAO();
      logDAO.salvar(`${entidade.constructor.name}.salvar`, "admin", new Date());

      return await dao.salvar(entidade);
   }

   async alterar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
      const dao = this.obterDAO(entidade);
      const retorno = await dao.alterar(entidade);

      if (retorno) {
         const logDAO: LogDAO = new LogDAO();
         logDAO.salvar(
            `${entidade.constructor.name}.alterar`,
            "admin",
            new Date()
         );
      }

      return retorno;
   }

   async excluir(entidade: EntidadeDominio): Promise<void> {
      const dao = this.obterDAO(entidade);
      await dao.excluir(entidade);
      const logDAO: LogDAO = new LogDAO();
      logDAO.salvar(
         `${entidade.constructor.name}.excluir`,
         "admin",
         new Date()
      );
   }

   async consultar(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
      const dao = this.obterDAO(entidade);

      return await dao.consultar(entidade);
   }

   async selecionar(entidade: EntidadeDominio): Promise<EntidadeDominio> {
      const dao = this.obterDAO(entidade);

      return await dao.selecionar(entidade);
   }

   private definirStrategies(): void {
      this.strategies.set(Cartao.name, [new ValidaCartao()]);
      this.strategies.set(Cliente.name, [new ValidaCliente(), new ValidaCPF()]);
      this.strategies.set(Endereco.name, [new ValidaEndereco()]);
      this.strategies.set(Telefone.name, [new ValidaTelefone()]);
   }

   private definirDAOs(): void {
      this.daos.set(Cartao.name, new CartaoDAO());
      this.daos.set(Cliente.name, new ClienteDAO());
      this.daos.set(Telefone.name, new TelefoneDAO());
      this.daos.set(Endereco.name, new EnderecoDAO());
      this.daos.set(Pais.name, new PaisDAO());
      this.daos.set(Estado.name, new EstadoDAO());
      this.daos.set(Cidade.name, new CidadeDAO());
   }

   private executar(entidade: EntidadeDominio): string {
      const classe: string = entidade.constructor.name;
      const strategyEntidade: IStrategy[] = this.strategies.get(classe) || [];
      let msg: string = "";

      strategyEntidade.forEach(
         (strategy) => (msg += strategy.processar(entidade))
      );

      return msg;
   }

   private obterDAO(entidade: EntidadeDominio): IDAO {
      const classe = entidade.constructor.name;
      const dao = this.daos.get(classe);

      if (!dao) {
         throw new Error(`DAO não encontrada para a classe: ${classe}`);
      }

      return dao;
   }
}
