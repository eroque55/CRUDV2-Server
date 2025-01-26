import { EntidadeDominio } from "./EntidadeDominio";
import { TipoEndereco } from "../enums/TipoEndereco";
import { TipoLogradouro } from "../enums/TipoLogradouro";
import { TipoResidencia } from "../enums/TipoResidencia";
import { Cidade } from "./Cidade";

export class Endereco extends EntidadeDominio {
   private _clienteId: number = 0;
   private _apelido: string = "";
   private _logradouro: string = "";
   private _numero: string = "";
   private _bairro: string = "";
   private _cep: string = "";
   private _observacoes: string = "";
   private _cidade: Cidade = new Cidade();
   private _tipoEndereco: TipoEndereco = TipoEndereco.NAO_DEFINIDO;
   private _tipoLogradouro: TipoLogradouro = TipoLogradouro.NAO_DEFINIDO;
   private _tipoResidencia: TipoResidencia = TipoResidencia.NAO_DEFINIDO;

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

   get Cidade(): Cidade {
      return this._cidade;
   }

   set Cidade(cidade: Cidade) {
      this._cidade = cidade;
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
