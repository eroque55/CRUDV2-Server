"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estado = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
class Estado extends EntidadeDominio_1.EntidadeDominio {
    constructor(id, _nome, _pais) {
        super(id);
        this._nome = _nome;
        this._pais = _pais;
    }
    get Nome() {
        return this._nome;
    }
    set Nome(nome) {
        this._nome = nome;
    }
    get Pais() {
        return this._pais;
    }
    set Pais(pais) {
        this._pais = pais;
    }
}
exports.Estado = Estado;
