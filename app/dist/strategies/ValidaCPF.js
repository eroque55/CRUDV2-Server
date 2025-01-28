"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../models/Cliente"));
class ValidaCPF {
    processar(entidade) {
        let mensagem = "";
        if (entidade instanceof Cliente_1.default) {
            const cliente = entidade;
            if (cliente.Id === 0) {
                const cpf = cliente.Cpf;
                if (!this.verificarComprimento(cpf) ||
                    this.verificarDigitosIguais(cpf)) {
                    mensagem += "CPF inválido";
                }
                if (!this.validarDigitosVerificadores(cpf)) {
                    mensagem += "CPF inválido";
                }
            }
        }
        return mensagem;
    }
    verificarComprimento(cpf) {
        return cpf.length === 11;
    }
    verificarDigitosIguais(cpf) {
        return cpf.split("").every((char) => char === cpf[0]);
    }
    validarDigitosVerificadores(cpf) {
        const calcularDigito = (cpf, pesoInicial) => {
            let soma = 0;
            for (let i = 0; i < pesoInicial - 1; i++) {
                soma += parseInt(cpf.charAt(i)) * (pesoInicial - i);
            }
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
        const primeiroDigito = calcularDigito(cpf, 10);
        const segundoDigito = calcularDigito(cpf, 11);
        return (primeiroDigito === parseInt(cpf.charAt(9)) &&
            segundoDigito === parseInt(cpf.charAt(10)));
    }
}
exports.default = ValidaCPF;
