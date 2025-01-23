import { EntidadeDominio } from "../Entitys/EntidadeDominio";

export interface IDAO {
  salvar(entidade: EntidadeDominio): Promise<EntidadeDominio | null>;
  alterar(entidade: EntidadeDominio): Promise<EntidadeDominio | null>;
  excluir(entidade: EntidadeDominio): Promise<boolean>;
  consultar(entidade: EntidadeDominio): Promise<EntidadeDominio[]>;
  selecionar(entidade: EntidadeDominio): Promise<EntidadeDominio | null>;
  validarTipo(entidade: EntidadeDominio): EntidadeDominio;
}
