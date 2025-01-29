import EntidadeDominio from "../models/EntidadeDominio";

export default interface IDAO {
   salvar(entidade: EntidadeDominio): Promise<EntidadeDominio>;
   alterar(entidade: EntidadeDominio): Promise<EntidadeDominio>;
   excluir(entidade: EntidadeDominio): Promise<void>;
   consultar(entidade: EntidadeDominio): Promise<EntidadeDominio[]>;
   selecionar(entidade: EntidadeDominio): Promise<EntidadeDominio>;
}
