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
exports.CidadeDAO = void 0;
const client_1 = require("@prisma/client");
const Cidade_1 = __importDefault(require("../../models/Cidade"));
const prisma = new client_1.PrismaClient();
class CidadeDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                const cidade = yield prisma.cidade.create({
                    data: {
                        nome: entidade.Nome,
                        estadoId: entidade.EstadoId,
                    },
                });
                return new Cidade_1.default(cidade.id, cidade.nome, cidade.estadoId);
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
                const cidade = yield prisma.cidade.update({
                    where: { id: entidade.Id },
                    data: {
                        nome: entidade.Nome,
                        estadoId: entidade.EstadoId,
                    },
                });
                return new Cidade_1.default(cidade.id, cidade.nome, cidade.estadoId);
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
                yield prisma.cidade.delete({
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
                const listaPaises = [];
                const cidades = yield prisma.cidade.findMany();
                for (let cidade of cidades) {
                    const cidadeTemp = new Cidade_1.default(cidade.id, cidade.nome, cidade.estadoId);
                    listaPaises.push(cidadeTemp);
                }
                return listaPaises;
            }
            catch (error) {
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
                return new Cidade_1.default(cidade.id, cidade.nome, cidade.estadoId);
            }
            catch (error) {
                return null;
            }
        });
    }
    validarTipo(entidade) {
        if (entidade instanceof Cidade_1.default) {
            return entidade;
        }
        else {
            throw new Error("Entidade não é uma Cidade");
        }
    }
}
exports.CidadeDAO = CidadeDAO;
