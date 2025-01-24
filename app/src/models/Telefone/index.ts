import EntidadeDominio from "../EntidadeDominio";
import TipoTelefone from "../TipoTelefone";

export default class Telefone extends EntidadeDominio {
  constructor(
    id: number,
    private _clienteId: number,
    private _ddd: string,
    private _numero: string,
    private _tipo: TipoTelefone
  ) {
    super(id);
  }

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
