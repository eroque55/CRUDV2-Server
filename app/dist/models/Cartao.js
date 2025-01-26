"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cartao = void 0;
const BandeiraCartao_1 = require("../enums/BandeiraCartao");
const EntidadeDominio_1 = require("./EntidadeDominio");
class Cartao extends EntidadeDominio_1.EntidadeDominio {
    constructor() {
        super(...arguments);
        this._clienteId = 0;
        this._numero = "";
        this._nomeImpresso = "";
        this._cvv = "";
        this._validade = "";
        this._preferencial = false;
        this._bandeiraCartao = BandeiraCartao_1.BandeiraCartao.NAO_DEFINIDO;
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
exports.Cartao = Cartao;
