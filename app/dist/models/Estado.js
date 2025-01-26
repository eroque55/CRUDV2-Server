"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estado = void 0;
const EntidadeDominio_1 = require("./EntidadeDominio");
const Pais_1 = require("./Pais");
class Estado extends EntidadeDominio_1.EntidadeDominio {
    constructor() {
        super(...arguments);
        this._nome = "";
        this._pais = new Pais_1.Pais();
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
