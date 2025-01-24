"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("../EntidadeDominio"));
class Estado extends EntidadeDominio_1.default {
    constructor(id, _nome, _paisId) {
        super(id);
        this._nome = _nome;
        this._paisId = _paisId;
    }
    get Nome() {
        return this._nome;
    }
    set Nome(nome) {
        this._nome = nome;
    }
    get PaisId() {
        return this._paisId;
    }
    set PaisId(paisId) {
        this._paisId = paisId;
    }
}
exports.default = Estado;
