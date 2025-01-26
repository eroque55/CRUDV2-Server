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
const Pais_1 = require("../models/Pais");
const prisma = new client_1.PrismaClient();
class PaisDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const pais = yield prisma.pais.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(pais);
            }
            catch (error) {
                console.error("Erro ao salvar pais:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const pais = yield prisma.pais.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(pais);
            }
            catch (error) {
                console.error("Erro ao alterar pais:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.pais.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                console.error("Erro ao excluir pais:", error);
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paises = yield prisma.pais.findMany();
                return paises.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar paises:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pais = yield prisma.pais.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!pais) {
                    throw new Error("Pais não encontrado");
                }
                return this.mapearParaDominio(pais);
            }
            catch (error) {
                console.error("Erro ao selecionar pais:", error);
                return null;
            }
        });
    }
    prepararDadosParaSalvar(entidadeDominio) {
        return {
            nome: entidadeDominio.Nome,
        };
    }
    mapearParaDominio(pais) {
        if (!pais) {
            throw new Error("Pais inválido para mapeamento");
        }
        const paisDeRetorno = new Pais_1.Pais();
        paisDeRetorno.Id = pais.id;
        paisDeRetorno.Nome = pais.nome;
        return paisDeRetorno;
    }
}
exports.default = PaisDAO;
