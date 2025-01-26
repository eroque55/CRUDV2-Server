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
const Telefone_1 = require("../models/Telefone");
const TipoTelefone_1 = require("../enums/TipoTelefone");
const prisma = new client_1.PrismaClient();
class TelefoneDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const telefone = yield prisma.telefone.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(telefone);
            }
            catch (error) {
                console.error("Erro ao salvar telefone:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaAlterar = this.prepararDadosParaAlterar(entidadeDominio);
                const telefone = yield prisma.telefone.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaAlterar,
                });
                return this.mapearParaDominio(telefone);
            }
            catch (error) {
                console.error("Erro ao alterar telefone:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.telefone.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                console.error("Erro ao excluir telefone:", error);
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const telefones = yield prisma.telefone.findMany();
                return telefones.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar telefones:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const telefone = yield prisma.telefone.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!telefone) {
                    throw new Error("Telefone não encontrado");
                }
                return this.mapearParaDominio(telefone);
            }
            catch (error) {
                return null;
            }
        });
    }
    prepararDadosParaSalvar(entidade) {
        return {
            ddd: entidade.Ddd,
            numero: entidade.Numero,
            tipoTelefone: entidade.Tipo.toString(),
            cliente: { connect: { id: entidade.ClienteId } },
        };
    }
    prepararDadosParaAlterar(entidade) {
        return {
            ddd: entidade.Ddd,
            numero: entidade.Numero,
            tipoTelefone: entidade.Tipo.toString(),
        };
    }
    mapearParaDominio(telefone) {
        if (!telefone) {
            throw new Error("Telefone invalido para mapeamento.");
        }
        const telefoneDeRetorno = new Telefone_1.Telefone();
        telefoneDeRetorno.Id = telefone.id;
        telefoneDeRetorno.ClienteId = telefone.clienteId;
        telefoneDeRetorno.Ddd = telefone.ddd;
        telefoneDeRetorno.Numero = telefone.numero;
        telefoneDeRetorno.Tipo =
            TipoTelefone_1.TipoTelefone[telefone.tipoTelefone];
        return telefoneDeRetorno;
    }
}
exports.default = TelefoneDAO;
