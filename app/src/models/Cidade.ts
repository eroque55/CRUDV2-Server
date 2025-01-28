import EntidadeDominio from "./EntidadeDominio";

export default class Cidade extends EntidadeDominio {
   private _nome: string = "";
   private _estadoId: number = 0;

   get Nome(): string {
      return this._nome;
   }

   set Nome(nome: string) {
      this._nome = nome;
   }

   get EstadoId(): number {
      return this._estadoId;
   }

   set EstadoId(estadoId: number) {
      this._estadoId = estadoId;
   }
}
