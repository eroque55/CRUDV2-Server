"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("./EntidadeDominio"));
class Cidade extends EntidadeDominio_1.default {
    constructor() {
        super(...arguments);
        this._nome = "";
        this._estadoId = 0;
    }
    get Nome() {
        return this._nome;
    }
    set Nome(nome) {
        this._nome = nome;
    }
    get EstadoId() {
        return this._estadoId;
    }
    set EstadoId(estadoId) {
        this._estadoId = estadoId;
    }
}
exports.default = Cidade;
