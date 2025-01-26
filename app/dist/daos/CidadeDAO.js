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
const Cidade_1 = require("../models/Cidade");
const prisma = new client_1.PrismaClient();
class CidadeDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const cidade = yield prisma.cidade.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(cidade);
            }
            catch (error) {
                console.error("Erro ao salvar cidade:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const cidade = yield prisma.cidade.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(cidade);
            }
            catch (error) {
                console.error("Erro ao alterar cidade:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.cidade.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                console.error("Erro ao excluir cidade:", error);
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cidades = yield prisma.cidade.findMany();
                return cidades.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar cidades:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cidade = yield prisma.cidade.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!cidade) {
                    throw new Error("Cidade não encontrada");
                }
                return this.mapearParaDominio(cidade);
            }
            catch (error) {
                console.error("Erro ao selecionar cidade:", error);
                return null;
            }
        });
    }
    prepararDadosParaSalvar(entidade) {
        return {
            nome: entidade.Nome,
            estado: { connect: { id: entidade.Estado.Id } },
        };
    }
    mapearParaDominio(cidade) {
        if (!cidade) {
            throw new Error("Cidade inválida para mapeamento.");
        }
        const CidadeDeRetorno = new Cidade_1.Cidade();
        CidadeDeRetorno.Id = cidade.id;
        CidadeDeRetorno.Nome = cidade.nome;
        CidadeDeRetorno.Estado.Id = cidade.estadoId;
        return CidadeDeRetorno;
    }
}
exports.default = CidadeDAO;
