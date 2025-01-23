import { Cliente } from "@prisma/client";
import { EntidadeDominio } from "./EntidadeDominio";
import { TipoTelefone } from "./TipoTelefone";

export class Telefone extends EntidadeDominio {
  constructor(
    id: number,
    private _cliente: Cliente,
    private _ddd: string,
    private _numero: string,
    private _tipo: TipoTelefone
  ) {
    super(id);
  }

  get Cliente(): Cliente {
    return this._cliente;
  }

  set Cliente(cliente: Cliente) {
    this._cliente = cliente;
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
