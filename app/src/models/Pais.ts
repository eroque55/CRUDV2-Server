import EntidadeDominio from "./EntidadeDominio";

export default class Pais extends EntidadeDominio {
   private _nome: string = "";

   get Nome(): string {
      return this._nome;
   }

   set Nome(nome: string) {
      this._nome = nome;
   }
}
