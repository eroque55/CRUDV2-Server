"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("./AbstractController"));
class ClienteController extends AbstractController_1.default {
    salvar(entidade) {
        return this.fachada.salvar(entidade);
    }
    alterar(entidade) {
        return this.fachada.alterar(entidade);
    }
    excluir(entidade) {
        return this.fachada.excluir(entidade);
    }
    consultar(entidade) {
        return this.fachada.consultar(entidade);
    }
    selecionar(entidade) {
        return this.fachada.selecionar(entidade);
    }
}
exports.default = ClienteController;
