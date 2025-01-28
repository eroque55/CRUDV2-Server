import EntidadeDominio from "./EntidadeDominio";
import TipoTelefone from "../enums/TipoTelefone";

export default class Telefone extends EntidadeDominio {
   private _clienteId: number = 0;
   private _ddd: string = "";
   private _numero: string = "";
   private _tipo: TipoTelefone = TipoTelefone.NAO_DEFINIDO;

   get ClienteId(): number {
      return this._clienteId;
   }

   set ClienteId(clienteId: number) {
      this._clienteId = clienteId;
   }

   get Ddd(): string {
      return this._ddd;
   }

   set Ddd(ddd: string) {
      this._ddd = ddd;
   }

   get Numero(): string {
      return this._numero;
   }

   set Numero(numero: string) {
      this._numero = numero;
   }

   get Tipo(): TipoTelefone {
      return this._tipo;
   }

   set Tipo(tipo: TipoTelefone) {
      this._tipo = tipo;
   }
}
