import { EntidadeDominio } from "./EntidadeDominio";
import { Estado } from "./Estado";

export class Cidade extends EntidadeDominio {
   private _nome: string = "";
   private _estado: Estado = new Estado();

   get Nome(): string {
      return this._nome;
   }

   set Nome(nome: string) {
      this._nome = nome;
   }

   get Estado(): Estado {
      return this._estado;
   }

   set Estado(estado: Estado) {
      this._estado = estado;
   }
}
