"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cartao_1 = __importDefault(require("../models/Cartao"));
const BandeiraCartao_1 = __importDefault(require("../enums/BandeiraCartao"));
class ValidaCartao {
    processar(entidadeDominio) {
        let mensagem = "";
        if (entidadeDominio instanceof Cartao_1.default) {
            const cartao = entidadeDominio;
            if (cartao.Id === 0) {
                if (cartao.ClienteId === 0) {
                    mensagem += "Cliente é obrigatório. ";
                }
                if (!cartao.Numero) {
                    mensagem += "Número do cartão é obrigatório. ";
                }
                if (!cartao.NomeImpresso) {
                    mensagem += "Nome impresso no cartão é obrigatório. ";
                }
                if (!cartao.Cvv) {
                    mensagem += "Código de segurança é obrigatório. ";
                }
                else if (cartao.Cvv.length !== 3) {
                    mensagem += "Código de segurança deve ter 3 dígitos. ";
                }
                if (!cartao.Validade) {
                    mensagem += "Data de validade é obrigatória. ";
                }
                if (cartao.BandeiraCartao === BandeiraCartao_1.default.NAO_DEFINIDO) {
                    mensagem += "Bandeira do cartão é obrigatória. ";
                }
            }
        }
        return mensagem;
    }
}
exports.default = ValidaCartao;
