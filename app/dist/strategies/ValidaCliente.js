"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../models/Cliente"));
class ValidaCliente {
    processar(entidadeDominio) {
        let mensagem = "";
        if (entidadeDominio instanceof Cliente_1.default) {
            const cliente = entidadeDominio;
            if (cliente.Id === 0) {
                if (!cliente.Nome) {
                    mensagem += "Nome é obrigatório. ";
                }
                if (!cliente.Cpf) {
                    mensagem += "CPF é obrigatório. ";
                }
                if (!cliente.Email) {
                    mensagem += "E-mail é obrigatório. ";
                }
                else if (!cliente.Email.includes("@")) {
                    mensagem += "E-mail inválido. ";
                }
                if (!cliente.Senha) {
                    mensagem += "Senha é obrigatória. ";
                }
                else {
                    if (cliente.Senha.length < 8) {
                        mensagem += "Senha deve ter no mínimo 8 caracteres. ";
                    }
                    if (!/[a-z]/.test(cliente.Senha)) {
                        mensagem += "Senha deve ter no mínimo 1 letra minúscula. ";
                    }
                    if (!/[A-Z]/.test(cliente.Senha)) {
                        mensagem += "Senha deve ter no mínimo 1 letra maiúscula. ";
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(cliente.Senha)) {
                        mensagem += "Senha deve ter no mínimo 1 caractere especial. ";
                    }
                }
                if (!cliente.ConfirmacaoSenha) {
                    mensagem += "Confirmação de senha é obrigatória. ";
                }
                else if (cliente.Senha !== cliente.ConfirmacaoSenha) {
                    mensagem += "Senhas não conferem. ";
                }
            }
        }
        return mensagem;
    }
}
exports.default = ValidaCliente;
