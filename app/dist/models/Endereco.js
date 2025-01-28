"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("./EntidadeDominio"));
const TipoEndereco_1 = __importDefault(require("../enums/TipoEndereco"));
const TipoLogradouro_1 = __importDefault(require("../enums/TipoLogradouro"));
const TipoResidencia_1 = __importDefault(require("../enums/TipoResidencia"));
class Endereco extends EntidadeDominio_1.default {
    constructor() {
        super(...arguments);
        this._clienteId = 0;
        this._apelido = "";
        this._logradouro = "";
        this._numero = "";
        this._bairro = "";
        this._cep = "";
        this._observacoes = "";
        this._cidadeId = 0;
        this._tipoEndereco = TipoEndereco_1.default.NAO_DEFINIDO;
        this._tipoLogradouro = TipoLogradouro_1.default.NAO_DEFINIDO;
        this._tipoResidencia = TipoResidencia_1.default.NAO_DEFINIDO;
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
