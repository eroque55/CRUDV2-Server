"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cidade = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
const Estado_1 = require("./Estado");
class Cidade extends EntidadeDominio_1.EntidadeDominio {
    constructor() {
        super(...arguments);
        this._nome = "";
        this._estado = new Estado_1.Estado();
    }
    get Nome() {
        return this._nome;
    }
    set Nome(nome) {
        this._nome = nome;
    }
    get Estado() {
        return this._estado;
    }
    set Estado(estado) {
        this._estado = estado;
    }
}
exports.Cidade = Cidade;
