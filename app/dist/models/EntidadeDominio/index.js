"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = EntidadeDominio;
