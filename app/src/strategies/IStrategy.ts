import EntidadeDominio from "../models/EntidadeDominio";

export default interface IStrategy {
   processar(entidadeDominio: EntidadeDominio): string;
}
