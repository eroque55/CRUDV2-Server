"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
const Genero_1 = require("../enums/Genero");
class Cliente extends EntidadeDominio_1.EntidadeDominio {
    constructor() {
        super(...arguments);
        this._nome = "";
        this._dataNascimento = new Date();
        this._cpf = "";
        this._genero = Genero_1.Genero.NAO_DEFINIDO;
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
exports.Cliente = Cliente;
