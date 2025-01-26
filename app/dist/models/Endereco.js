"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endereco = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
const TipoEndereco_1 = require("../enums/TipoEndereco");
const TipoLogradouro_1 = require("../enums/TipoLogradouro");
const TipoResidencia_1 = require("../enums/TipoResidencia");
const Cidade_1 = require("./Cidade");
class Endereco extends EntidadeDominio_1.EntidadeDominio {
    constructor() {
        super(...arguments);
        this._clienteId = 0;
        this._apelido = "";
        this._logradouro = "";
        this._numero = "";
        this._bairro = "";
        this._cep = "";
        this._observacoes = "";
        this._cidade = new Cidade_1.Cidade();
        this._tipoEndereco = TipoEndereco_1.TipoEndereco.NAO_DEFINIDO;
        this._tipoLogradouro = TipoLogradouro_1.TipoLogradouro.NAO_DEFINIDO;
        this._tipoResidencia = TipoResidencia_1.TipoResidencia.NAO_DEFINIDO;
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
exports.Endereco = Endereco;
