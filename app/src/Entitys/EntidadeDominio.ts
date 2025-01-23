export class EntidadeDominio {
  constructor(private _id: number, private _dataCadastro: Date = new Date()) {}

  get Id(): number {
    return this._id;
  }

  set Id(id: number) {
    this._id = id;
  }

  get DataCadastro(): Date {
    return this._dataCadastro;
  }

  set DataCadastro(dataCadastro: Date) {
    this._dataCadastro = dataCadastro;
  }
}
