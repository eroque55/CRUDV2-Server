"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cidade = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
class Cidade extends EntidadeDominio_1.EntidadeDominio {
    constructor(id, _nome, _estado) {
        super(id);
        this._nome = _nome;
        this._estado = _estado;
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
