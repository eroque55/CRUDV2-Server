"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("../EntidadeDominio"));
class Cartao extends EntidadeDominio_1.default {
    constructor(id, _clienteId, _numero, _nomeImpresso, _cvv, _validade, _preferencial, _bandeiraCartao) {
        super(id);
        this._clienteId = _clienteId;
        this._numero = _numero;
        this._nomeImpresso = _nomeImpresso;
        this._cvv = _cvv;
        this._validade = _validade;
        this._preferencial = _preferencial;
        this._bandeiraCartao = _bandeiraCartao;
    }
    get ClienteId() {
        return this._clienteId;
    }
    set ClienteId(clienteId) {
        this._clienteId = clienteId;
    }
    get Numero() {
        return this._numero;
    }
    set Numero(numero) {
        this._numero = numero;
    }
    get NomeImpresso() {
        return this._nomeImpresso;
    }
    set NomeImpresso(nomeImpresso) {
        this._nomeImpresso = nomeImpresso;
    }
    get Cvv() {
        return this._cvv;
    }
    set Cvv(cvv) {
        this._cvv = cvv;
    }
    get Validade() {
        return this._validade;
    }
    set Validade(validade) {
        this._validade = validade;
    }
    get Preferencial() {
        return this._preferencial;
    }
    set Preferencial(preferencial) {
        this._preferencial = preferencial;
    }
    get BandeiraCartao() {
        return this._bandeiraCartao;
    }
    set BandeiraCartao(bandeiraCartao) {
        this._bandeiraCartao = bandeiraCartao;
    }
}
exports.default = Cartao;
