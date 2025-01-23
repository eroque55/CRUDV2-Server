"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pais = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
class Pais extends EntidadeDominio_1.EntidadeDominio {
    constructor(id, _nome) {
        super(id);
        this._nome = _nome;
    }
    get Nome() {
        return this._nome;
    }
    set Nome(nome) {
        this._nome = nome;
    }
}
exports.Pais = Pais;
