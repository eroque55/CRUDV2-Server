import EntidadeDominio from "../EntidadeDominio";

export default class Pais extends EntidadeDominio {
  constructor(id: number, private _nome: string) {
    super(id);
  }

  get Nome(): string {
    return this._nome;
  }

  set Nome(nome: string) {
    this._nome = nome;
  }
}
