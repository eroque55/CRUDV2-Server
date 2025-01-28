"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("./EntidadeDominio"));
const Genero_1 = __importDefault(require("../enums/Genero"));
class Cliente extends EntidadeDominio_1.default {
    constructor() {
        super(...arguments);
        this._nome = "";
        this._dataNascimento = new Date();
        this._cpf = "";
        this._genero = Genero_1.default.NAO_DEFINIDO;
        this._email = "";
        this._senha = "";
        this._confirmacaoSenha = "";
        this._status = false;
        this._ranking = 0;
    }
    get Nome() {
        return this._nome;
    }
    set Nome(nome) {
        this._nome = nome;
    }
    get DataNascimento() {
        return this._dataNascimento;
    }
    set DataNascimento(dataNascimento) {
        this._dataNascimento = dataNascimento;
    }
    get Cpf() {
        return this._cpf;
    }
    set Cpf(cpf) {
        this._cpf = cpf;
    }
    get Email() {
        return this._email;
    }
    set Email(email) {
        this._email = email;
    }
    get Senha() {
        return this._senha;
    }
    set Senha(senha) {
        this._senha = senha;
    }
    get ConfirmacaoSenha() {
        return this._confirmacaoSenha;
    }
    set ConfirmacaoSenha(confirmacaoSenha) {
        this._confirmacaoSenha = confirmacaoSenha;
    }
    get Status() {
        return this._status;
    }
    set Status(status) {
        this._status = status;
    }
    get Genero() {
        return this._genero;
    }
    set Genero(genero) {
        this._genero = genero;
    }
    get Ranking() {
        return this._ranking;
    }
    set Ranking(ranking) {
        this._ranking = ranking;
    }
}
exports.default = Cliente;
