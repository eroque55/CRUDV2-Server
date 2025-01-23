"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntidadeDominio = void 0;
class EntidadeDominio {
    constructor(_id) {
        this._id = _id;
    }
    get Id() {
        return this._id;
    }
    set Id(id) {
        this._id = id;
    }
}
exports.EntidadeDominio = EntidadeDominio;
