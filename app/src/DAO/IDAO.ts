import { EntidadeDominio } from "../Entitys/EntidadeDominio";

export interface IDAO {
    salvar(entidade: EntidadeDominio): number;
    alterar(entidade: EntidadeDominio): boolean;
    excluir(entidade: EntidadeDominio): boolean;
    consultar(entidade: EntidadeDominio): EntidadeDominio[];
    selecionar(entidade: EntidadeDominio): EntidadeDominio;
}
