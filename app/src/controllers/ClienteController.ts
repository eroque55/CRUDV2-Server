import AbstractController from "./AbstractController";
import EntidadeDominio from "../models/EntidadeDominio";

export default class ClienteController extends AbstractController {
   salvar(entidade: EntidadeDominio): Promise<EntidadeDominio | null> {
      return this.fachada.salvar(entidade);
   }
   alterar(entidade: EntidadeDominio): Promise<EntidadeDominio | null> {
      return this.fachada.alterar(entidade);
   }
   excluir(entidade: EntidadeDominio): Promise<boolean> {
      return this.fachada.excluir(entidade);
   }
   consultar(entidade: EntidadeDominio): Promise<EntidadeDominio[]> {
      return this.fachada.consultar(entidade);
   }
   selecionar(entidade: EntidadeDominio): Promise<EntidadeDominio | null> {
      return this.fachada.selecionar(entidade);
   }
}
