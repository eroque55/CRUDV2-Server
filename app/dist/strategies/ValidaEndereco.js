"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Endereco_1 = __importDefault(require("../models/Endereco"));
const TipoEndereco_1 = __importDefault(require("../enums/TipoEndereco"));
const TipoLogradouro_1 = __importDefault(require("../enums/TipoLogradouro"));
const TipoResidencia_1 = __importDefault(require("../enums/TipoResidencia"));
class ValidaTelefone {
    processar(entidadeDominio) {
        let mensagem = "";
        if (entidadeDominio instanceof Endereco_1.default) {
            const endereco = entidadeDominio;
            if (endereco.Id === 0) {
                if (endereco.ClienteId === 0) {
                    mensagem += "Cliente é obrigatório. ";
                }
                if (!endereco.Apelido) {
                    mensagem += "Apelido é obrigatório. ";
                }
                if (!endereco.Logradouro) {
                    mensagem += "Logradouro é obrigatório. ";
                }
                if (!endereco.Bairro) {
                    mensagem += "Bairro é obrigatório. ";
                }
                if (!endereco.Cep) {
                    mensagem += "CEP é obrigatório. ";
                }
                else if (endereco.Cep.length !== 8) {
                    mensagem += "CEP inválido. ";
                }
                if (endereco.CidadeId === 0) {
                    mensagem += "Cidade é obrigatório. ";
                }
                if (endereco.TipoEndereco === TipoEndereco_1.default.NAO_DEFINIDO) {
                    mensagem += "Tipo de endereço é obrigatório. ";
                }
                if (endereco.TipoLogradouro === TipoLogradouro_1.default.NAO_DEFINIDO) {
                    mensagem += "Tipo de logradouro é obrigatório. ";
                }
                if (endereco.TipoResidencia === TipoResidencia_1.default.NAO_DEFINIDO) {
                    mensagem += "Tipo de residência é obrigatória. ";
                }
            }
        }
        return mensagem;
    }
}
exports.default = ValidaTelefone;
