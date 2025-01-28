"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Telefone_1 = __importDefault(require("../models/Telefone"));
const TipoTelefone_1 = __importDefault(require("../enums/TipoTelefone"));
class ValidaTelefone {
    processar(entidadeDominio) {
        let mensagem = "";
        if (entidadeDominio instanceof Telefone_1.default) {
            const telefone = entidadeDominio;
            if (telefone.Id === 0) {
                if (telefone.ClienteId === 0) {
                    mensagem += "Cliente é obrigatório. ";
                }
                if (!telefone.Ddd) {
                    mensagem += "DDD é obrigatório. ";
                }
                if (!telefone.Numero) {
                    mensagem += "Número é obrigatório. ";
                }
                else if (telefone.Numero.length < 8 ||
                    telefone.Numero.length > 9) {
                    mensagem += "Número de telefone inválido. ";
                }
                if (telefone.Tipo === TipoTelefone_1.default.NAO_DEFINIDO) {
                    mensagem += "Tipo de telefone é obrigatório. ";
                }
            }
        }
        return mensagem;
    }
}
exports.default = ValidaTelefone;
