"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeDominio_1 = __importDefault(require("../EntidadeDominio"));
class Pais extends EntidadeDominio_1.default {
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
exports.default = Pais;
