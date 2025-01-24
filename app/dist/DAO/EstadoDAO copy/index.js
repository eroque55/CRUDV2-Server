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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoDAO = void 0;
const client_1 = require("@prisma/client");
const Estado_1 = __importDefault(require("../../models/Estado"));
const prisma = new client_1.PrismaClient();
class EstadoDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                const estado = yield prisma.estado.create({
                    data: {
                        nome: entidade.Nome,
                        pais: { connect: { id: entidade.PaisId } },
                    },
                });
                return new Estado_1.default(estado.id, estado.nome, estado.paisId);
            }
            catch (error) {
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                const estado = yield prisma.estado.update({
                    where: { id: entidade.Id },
                    data: {
                        nome: entidade.Nome,
                        pais: { connect: { id: entidade.PaisId } },
                    },
                });
                return new Estado_1.default(estado.id, estado.nome, estado.paisId);
            }
            catch (error) {
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                yield prisma.estado.delete({
                    where: { id: entidade.Id },
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    consultar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listaEstados = [];
                const estados = yield prisma.estado.findMany();
                for (let estado of estados) {
                    const estadoTemp = new Estado_1.default(estado.id, estado.nome, estado.paisId);
                    listaEstados.push(estadoTemp);
                }
                return listaEstados;
            }
            catch (error) {
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
                return new Estado_1.default(estado.id, estado.nome, estado.paisId);
            }
            catch (error) {
                return null;
            }
        });
    }
    validarTipo(entidade) {
        if (entidade instanceof Estado_1.default) {
            return entidade;
        }
        else {
            throw new Error("Entidade não é um Estado");
        }
    }
}
exports.EstadoDAO = EstadoDAO;
