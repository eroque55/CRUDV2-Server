"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("../EntidadeDominio"));
class Endereco extends EntidadeDominio_1.default {
    constructor(id, _clienteId, _apelido, _logradouro, _numero, _bairro, _cep, _observacoes, _cidadeId, _tipoEndereco, _tipoLogradouro, _tipoResidencia) {
        super(id);
        this._clienteId = _clienteId;
        this._apelido = _apelido;
        this._logradouro = _logradouro;
        this._numero = _numero;
        this._bairro = _bairro;
        this._cep = _cep;
        this._observacoes = _observacoes;
        this._cidadeId = _cidadeId;
        this._tipoEndereco = _tipoEndereco;
        this._tipoLogradouro = _tipoLogradouro;
        this._tipoResidencia = _tipoResidencia;
    }
    get ClienteId() {
        return this._clienteId;
    }
    set ClienteId(clienteId) {
        this._clienteId = clienteId;
    }
    get Apelido() {
        return this._apelido;
    }
    set Apelido(apelido) {
        this._apelido = apelido;
    }
    get Logradouro() {
        return this._logradouro;
    }
    set Logradouro(logradouro) {
        this._logradouro = logradouro;
    }
    get Numero() {
        return this._numero;
    }
    set Numero(numero) {
        this._numero = numero;
    }
    get Bairro() {
        return this._bairro;
    }
    set Bairro(bairro) {
        this._bairro = bairro;
    }
    get Cep() {
        return this._cep;
    }
    set Cep(cep) {
        this._cep = cep;
    }
    get Observacoes() {
        return this._observacoes;
    }
    set Observacoes(observacoes) {
        this._observacoes = observacoes;
    }
    get CidadeId() {
        return this._cidadeId;
    }
    set CidadeId(cidadeId) {
        this._cidadeId = cidadeId;
    }
    get TipoEndereco() {
        return this._tipoEndereco;
    }
    set TipoEndereco(tipoEndereco) {
        this._tipoEndereco = tipoEndereco;
    }
    get TipoLogradouro() {
        return this._tipoLogradouro;
    }
    set TipoLogradouro(tipoLogradouro) {
        this._tipoLogradouro = tipoLogradouro;
    }
    get TipoResidencia() {
        return this._tipoResidencia;
    }
    set TipoResidencia(tipoResidencia) {
        this._tipoResidencia = tipoResidencia;
    }
}
exports.default = Endereco;
