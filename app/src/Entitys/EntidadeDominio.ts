export class EntidadeDominio {
  constructor(private _id: number) {}

  get Id(): number {
    return this._id;
  }

  set Id(id: number) {
    this._id = id;
  }
}
