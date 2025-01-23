"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntidadeDominio = void 0;
class EntidadeDominio {
    constructor(_id, _dataCadastro = new Date()) {
        this._id = _id;
        this._dataCadastro = _dataCadastro;
    }
    get Id() {
        return this._id;
    }
    set Id(id) {
        this._id = id;
    }
    get DataCadastro() {
        return this._dataCadastro;
    }
    set DataCadastro(dataCadastro) {
        this._dataCadastro = dataCadastro;
    }
}
exports.EntidadeDominio = EntidadeDominio;
