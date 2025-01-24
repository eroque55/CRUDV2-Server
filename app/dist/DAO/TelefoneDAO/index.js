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
const Telefone_1 = __importDefault(require("../../models/Telefone"));
const TipoTelefone_1 = __importDefault(require("../../models/TipoTelefone"));
const prisma = new client_1.PrismaClient();
class TelefoneDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                const telefone = yield prisma.telefone.create({
                    data: {
                        ddd: entidade.Ddd,
                        numero: entidade.Numero,
                        tipoTelefone: entidade.Tipo.toString(),
                        cliente: { connect: { id: entidade.ClienteId } },
                    },
                });
                return new Telefone_1.default(telefone.id, telefone.clienteId, telefone.ddd, telefone.numero, TipoTelefone_1.default[telefone.tipoTelefone]);
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
                const telefone = yield prisma.telefone.update({
                    where: { id: entidade.Id },
                    data: {
                        ddd: entidade.Ddd,
                        numero: entidade.Numero,
                        tipoTelefone: entidade.Tipo.toString(),
                        cliente: { connect: { id: entidade.ClienteId } },
                    },
                });
                return new Telefone_1.default(telefone.id, telefone.clienteId, telefone.ddd, telefone.numero, TipoTelefone_1.default[telefone.tipoTelefone]);
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
                yield prisma.telefone.delete({
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
                const listaTelefones = [];
                const telefones = yield prisma.telefone.findMany();
                for (let telefone of telefones) {
                    const telefoneTemp = new Telefone_1.default(telefone.id, telefone.clienteId, telefone.ddd, telefone.numero, TipoTelefone_1.default[telefone.tipoTelefone]);
                    listaTelefones.push(telefoneTemp);
                }
                return listaTelefones;
            }
            catch (error) {
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
                return new Telefone_1.default(telefone.id, telefone.clienteId, telefone.ddd, telefone.numero, TipoTelefone_1.default[telefone.tipoTelefone]);
            }
            catch (error) {
                return null;
            }
        });
    }
    validarTipo(entidade) {
        if (entidade instanceof Telefone_1.default) {
            return entidade;
        }
        else {
            throw new Error("Entidade não é um Telefone");
        }
    }
}
exports.default = TelefoneDAO;
