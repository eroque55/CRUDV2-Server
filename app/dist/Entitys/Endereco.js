"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = require("./EntidadeDominio");
class Endereco extends EntidadeDominio_1.EntidadeDominio {
    constructor(id, _cliente, _apelido, _logradouro, _numero, _bairro, _cep, _observacoes, _cidade, _tipoEndereco, _tipoLogradouro, _tipoResidencia) {
        super(id);
        this._cliente = _cliente;
        this._apelido = _apelido;
        this._logradouro = _logradouro;
        this._numero = _numero;
        this._bairro = _bairro;
        this._cep = _cep;
        this._observacoes = _observacoes;
        this._cidade = _cidade;
        this._tipoEndereco = _tipoEndereco;
        this._tipoLogradouro = _tipoLogradouro;
        this._tipoResidencia = _tipoResidencia;
    }
    get Cliente() {
        return this._cliente;
    }
    set Cliente(cliente) {
        this._cliente = cliente;
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
    get Cidade() {
        return this._cidade;
    }
    set Cidade(cidade) {
        this._cidade = cidade;
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
