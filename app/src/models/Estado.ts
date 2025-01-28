import EntidadeDominio from "./EntidadeDominio";

export default class Estado extends EntidadeDominio {
   private _nome: string = "";
   private _paisId: number = 0;

   get Nome(): string {
      return this._nome;
   }

   set Nome(nome: string) {
      this._nome = nome;
   }

   get PaisId(): number {
      return this._paisId;
   }

   set PaisId(paisId: number) {
      this._paisId = paisId;
   }
}
