"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telefone = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
const TipoTelefone_1 = require("../enums/TipoTelefone");
class Telefone extends EntidadeDominio_1.EntidadeDominio {
    constructor() {
        super(...arguments);
        this._clienteId = 0;
        this._ddd = "";
        this._numero = "";
        this._tipo = TipoTelefone_1.TipoTelefone.NAO_DEFINIDO;
    }
    get ClienteId() {
        return this._clienteId;
    }
    set ClienteId(clienteId) {
        this._clienteId = clienteId;
    }
    get Ddd() {
        return this._ddd;
    }
    set Ddd(ddd) {
        this._ddd = ddd;
    }
    get Numero() {
        return this._numero;
    }
    set Numero(numero) {
        this._numero = numero;
    }
    get Tipo() {
        return this._tipo;
    }
    set Tipo(tipo) {
        this._tipo = tipo;
    }
}
exports.Telefone = Telefone;
