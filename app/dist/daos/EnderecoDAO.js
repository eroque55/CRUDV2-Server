"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Endereco_1 = require("../models/Endereco");
const TipoEndereco_1 = require("../enums/TipoEndereco");
const TipoLogradouro_1 = require("../enums/TipoLogradouro");
const TipoResidencia_1 = require("../enums/TipoResidencia");
const prisma = new client_1.PrismaClient();
class EnderecoDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const endereco = yield prisma.endereco.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(endereco);
            }
            catch (error) {
                console.error("Erro ao salvar endereço:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaAlterar = this.prepararDadosParaAlterar(entidadeDominio);
                const endereco = yield prisma.endereco.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaAlterar,
                });
                return this.mapearParaDominio(endereco);
            }
            catch (error) {
                console.error("Erro ao alterar endereço:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.endereco.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enderecos = yield prisma.endereco.findMany();
                return enderecos.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar endereços:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endereco = yield prisma.endereco.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!endereco) {
                    throw new Error("Endereco não encontrado");
                }
                return this.mapearParaDominio(endereco);
            }
            catch (error) {
                console.error("Erro ao selecionar endereço:", error);
                return null;
            }
        });
    }
    prepararDadosParaSalvar(entidade) {
        return {
            cliente: { connect: { id: entidade.ClienteId } },
            apelido: entidade.Apelido,
            logradouro: entidade.Logradouro,
            numero: entidade.Numero,
            bairro: entidade.Bairro,
            cep: entidade.Cep,
            observacoes: entidade.Observacoes,
            cidade: { connect: { id: entidade.Cidade.Id } },
            tipoEndereco: entidade.TipoEndereco.toString(),
            tipoLogradouro: entidade.TipoLogradouro.toString(),
            tipoResidencia: entidade.TipoResidencia.toString(),
        };
    }
    prepararDadosParaAlterar(entidade) {
        return {
            apelido: entidade.Apelido,
            logradouro: entidade.Logradouro,
            numero: entidade.Numero,
            bairro: entidade.Bairro,
            cep: entidade.Cep,
            observacoes: entidade.Observacoes,
            cidade: { connect: { id: entidade.Cidade.Id } },
            tipoLogradouro: entidade.TipoLogradouro.toString(),
            tipoResidencia: entidade.TipoResidencia.toString(),
        };
    }
    mapearParaDominio(endereco) {
        if (!endereco) {
            throw new Error("Endereco inválido para mapeamento.");
        }
        const enderecoDeRetorno = new Endereco_1.Endereco();
        enderecoDeRetorno.Id = endereco.id;
        enderecoDeRetorno.ClienteId = endereco.clienteId;
        enderecoDeRetorno.Apelido = endereco.apelido;
        enderecoDeRetorno.Logradouro = endereco.logradouro;
        enderecoDeRetorno.Numero = endereco.numero;
        enderecoDeRetorno.Bairro = endereco.bairro;
        enderecoDeRetorno.Cep = endereco.cep;
        enderecoDeRetorno.Observacoes = endereco.observacoes;
        enderecoDeRetorno.Cidade.Id = endereco.cidadeId;
        enderecoDeRetorno.TipoEndereco =
            TipoEndereco_1.TipoEndereco[endereco.tipoEndereco];
        enderecoDeRetorno.TipoLogradouro =
            TipoLogradouro_1.TipoLogradouro[endereco.tipoLogradouro];
        enderecoDeRetorno.TipoResidencia =
            TipoResidencia_1.TipoResidencia[endereco.tipoResidencia];
        return enderecoDeRetorno;
    }
}
exports.default = EnderecoDAO;
