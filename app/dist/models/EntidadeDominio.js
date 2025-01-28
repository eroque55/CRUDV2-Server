"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntidadeDominio {
    constructor() {
        this._id = 0;
    }
    get Id() {
        return this._id;
    }
    set Id(id) {
        this._id = id;
    }
}
exports.default = EntidadeDominio;
