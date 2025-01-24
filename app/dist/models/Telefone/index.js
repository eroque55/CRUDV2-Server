"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("../EntidadeDominio"));
class Telefone extends EntidadeDominio_1.default {
    constructor(id, _clienteId, _ddd, _numero, _tipo) {
        super(id);
        this._clienteId = _clienteId;
        this._ddd = _ddd;
        this._numero = _numero;
        this._tipo = _tipo;
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
exports.default = Telefone;
