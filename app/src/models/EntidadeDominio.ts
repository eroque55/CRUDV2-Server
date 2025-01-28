export default class EntidadeDominio {
   private _id: number = 0;

   get Id(): number {
      return this._id;
   }

   set Id(id: number) {
      this._id = id;
   }
}
