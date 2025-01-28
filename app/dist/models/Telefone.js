"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("./EntidadeDominio"));
const TipoTelefone_1 = __importDefault(require("../enums/TipoTelefone"));
class Telefone extends EntidadeDominio_1.default {
    constructor() {
        super(...arguments);
        this._clienteId = 0;
        this._ddd = "";
        this._numero = "";
        this._tipo = TipoTelefone_1.default.NAO_DEFINIDO;
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
