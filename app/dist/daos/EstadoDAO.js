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
const Estado_1 = require("../models/Estado");
const prisma = new client_1.PrismaClient();
class EstadoDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const estado = yield prisma.estado.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(estado);
            }
            catch (error) {
                console.error("Erro ao salvar estado:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const estado = yield prisma.estado.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(estado);
            }
            catch (error) {
                console.error("Erro ao alterar estado:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.estado.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                console.error("Erro ao excluir estado:", error);
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estados = yield prisma.estado.findMany();
                return estados.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar estados:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estado = yield prisma.estado.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!estado) {
                    throw new Error("Estado não encontrado");
                }
                return this.mapearParaDominio(estado);
            }
            catch (error) {
                console.error("Erro ao selecionar estado:", error);
                return null;
            }
        });
    }
    prepararDadosParaSalvar(entidade) {
        return {
            nome: entidade.Nome,
            pais: { connect: { id: entidade.Pais.Id } },
        };
    }
    mapearParaDominio(estado) {
        if (!estado) {
            throw new Error("Estado inválido para mapeamento");
        }
        const estadoDeRetorno = new Estado_1.Estado();
        estadoDeRetorno.Id = estado.id;
        estadoDeRetorno.Nome = estado.nome;
        estadoDeRetorno.Pais.Id = estado.paisId;
        return estadoDeRetorno;
    }
}
exports.default = EstadoDAO;
