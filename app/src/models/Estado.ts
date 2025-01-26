import { EntidadeDominio } from "./EntidadeDominio";
import { Pais } from "./Pais";

export class Estado extends EntidadeDominio {
   private _nome: string = "";
   private _pais: Pais = new Pais();

   get Nome(): string {
      return this._nome;
   }

   set Nome(nome: string) {
      this._nome = nome;
   }

   get Pais(): Pais {
      return this._pais;
   }

   set Pais(pais: Pais) {
      this._pais = pais;
   }
}
