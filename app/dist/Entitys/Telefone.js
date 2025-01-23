"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telefone = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
class Telefone extends EntidadeDominio_1.EntidadeDominio {
    constructor(id, _cliente, _ddd, _numero, _tipo) {
        super(id);
        this._cliente = _cliente;
        this._ddd = _ddd;
        this._numero = _numero;
        this._tipo = _tipo;
    }
    get Cliente() {
        return this._cliente;
    }
    set Cliente(cliente) {
        this._cliente = cliente;
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
