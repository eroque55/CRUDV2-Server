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
const client_1 = require("@prisma/client");
const Pais_1 = __importDefault(require("../../models/Pais"));
const prisma = new client_1.PrismaClient();
class PaisDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                const pais = yield prisma.pais.create({
                    data: {
                        nome: entidade.Nome,
                    },
                });
                return new Pais_1.default(pais.id, pais.nome);
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
                const pais = yield prisma.pais.update({
                    where: { id: entidade.Id },
                    data: {
                        nome: entidade.Nome,
                    },
                });
                return new Pais_1.default(pais.id, pais.nome);
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
                yield prisma.pais.delete({
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
                const paises = yield prisma.pais.findMany();
                for (let pais of paises) {
                    const paisTemp = new Pais_1.default(pais.id, pais.nome);
                    listaPaises.push(paisTemp);
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
                const pais = yield prisma.pais.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!pais) {
                    throw new Error("Pais não encontrado");
                }
                return new Pais_1.default(pais.id, pais.nome);
            }
            catch (error) {
                return null;
            }
        });
    }
    validarTipo(entidade) {
        if (entidade instanceof Pais_1.default) {
            return entidade;
        }
        else {
            throw new Error("Entidade não é um Pais");
        }
    }
}
exports.default = PaisDAO;
