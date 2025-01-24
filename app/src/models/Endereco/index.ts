import EntidadeDominio from "../EntidadeDominio";
import TipoEndereco from "../TipoEndereco";
import TipoLogradouro from "../TipoLogradouro";
import TipoResidencia from "../TipoResidencia";

export default class Endereco extends EntidadeDominio {
  constructor(
    id: number,
    private _clienteId: number,
    private _apelido: string,
    private _logradouro: string,
    private _numero: string,
    private _bairro: string,
    private _cep: string,
    private _observacoes: string,
    private _cidadeId: number,
    private _tipoEndereco: TipoEndereco,
    private _tipoLogradouro: TipoLogradouro,
    private _tipoResidencia: TipoResidencia
  ) {
    super(id);
  }

  get ClienteId(): number {
    return this._clienteId;
  }

  set ClienteId(clienteId: number) {
    this._clienteId = clienteId;
  }

  get Apelido(): string {
    return this._apelido;
  }

  set Apelido(apelido: string) {
    this._apelido = apelido;
  }

  get Logradouro(): string {
    return this._logradouro;
  }

  set Logradouro(logradouro: string) {
    this._logradouro = logradouro;
  }

  get Numero(): string {
    return this._numero;
  }

  set Numero(numero: string) {
    this._numero = numero;
  }

  get Bairro(): string {
    return this._bairro;
  }

  set Bairro(bairro: string) {
    this._bairro = bairro;
  }

  get Cep(): string {
    return this._cep;
  }

  set Cep(cep: string) {
    this._cep = cep;
  }

  get Observacoes(): string {
    return this._observacoes;
  }

  set Observacoes(observacoes: string) {
    this._observacoes = observacoes;
  }

  get CidadeId(): number {
    return this._cidadeId;
  }

  set CidadeId(cidadeId: number) {
    this._cidadeId = cidadeId;
  }

  get TipoEndereco(): TipoEndereco {
    return this._tipoEndereco;
  }

  set TipoEndereco(tipoEndereco: TipoEndereco) {
    this._tipoEndereco = tipoEndereco;
  }

  get TipoLogradouro(): TipoLogradouro {
    return this._tipoLogradouro;
  }

  set TipoLogradouro(tipoLogradouro: TipoLogradouro) {
    this._tipoLogradouro = tipoLogradouro;
  }

  get TipoResidencia(): TipoResidencia {
    return this._tipoResidencia;
  }

  set TipoResidencia(tipoResidencia: TipoResidencia) {
    this._tipoResidencia = tipoResidencia;
  }
}
