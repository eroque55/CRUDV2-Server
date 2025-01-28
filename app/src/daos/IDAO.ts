import EntidadeDominio from "../models/EntidadeDominio";

export default interface IDAO {
   salvar(entidade: EntidadeDominio): Promise<EntidadeDominio | null>;
   alterar(entidade: EntidadeDominio): Promise<EntidadeDominio | null>;
   excluir(entidade: EntidadeDominio): Promise<boolean>;
   consultar(entidade: EntidadeDominio): Promise<EntidadeDominio[]>;
   selecionar(entidade: EntidadeDominio): Promise<EntidadeDominio | null>;
}
