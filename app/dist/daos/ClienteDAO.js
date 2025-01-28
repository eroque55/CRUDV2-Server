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
const crypto_1 = __importDefault(require("crypto"));
const Cliente_1 = __importDefault(require("../models/Cliente"));
const Genero_1 = __importDefault(require("../enums/Genero"));
const prisma = new client_1.PrismaClient();
class ClienteDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const cliente = yield prisma.cliente.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(cliente);
            }
            catch (error) {
                console.error("Erro ao salvar cliente:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaAlterar = this.prepararDadosParaAlterar(entidadeDominio);
                const cliente = yield prisma.cliente.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaAlterar,
                });
                return this.mapearParaDominio(cliente);
            }
            catch (error) {
                console.error("Erro ao alterar cliente:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.cliente.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                console.error("Erro ao excluir cliente:", error);
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield prisma.cliente.findMany();
                return clientes.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar clientes:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield prisma.cliente.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!cliente) {
                    throw new Error("Pais não encontrado");
                }
                return this.mapearParaDominio(cliente);
            }
            catch (error) {
                console.error("Erro ao selecionar cliente:", error);
                return null;
            }
        });
    }
    criptografarSenha(senha) {
        try {
            const hash = crypto_1.default.createHash("sha256").update(senha).digest("hex");
            return hash;
        }
        catch (error) {
            return "";
        }
    }
    prepararDadosParaSalvar(entidade) {
        return {
            nome: entidade.Nome,
            dataNascimento: entidade.DataNascimento,
            cpf: entidade.Cpf,
            email: entidade.Email,
            senha: this.criptografarSenha(entidade.Senha),
            status: entidade.Status,
            genero: entidade.Genero.toString(),
            ranking: entidade.Ranking,
        };
    }
    prepararDadosParaAlterar(entidade) {
        return {
            nome: entidade.Nome,
            dataNascimento: entidade.DataNascimento,
            cpf: entidade.Cpf,
            email: entidade.Email,
            status: entidade.Status,
            genero: entidade.Genero.toString(),
            ranking: entidade.Ranking,
        };
    }
    mapearParaDominio(cliente) {
        if (!cliente) {
            throw new Error("Cliente inválido para mapeamento.");
        }
        const clienteDeRetorno = new Cliente_1.default();
        clienteDeRetorno.Id = cliente.id;
        clienteDeRetorno.Nome = cliente.nome;
        clienteDeRetorno.DataNascimento = cliente.dataNascimento;
        clienteDeRetorno.Cpf = cliente.cpf;
        clienteDeRetorno.Email = cliente.email;
        clienteDeRetorno.Status = cliente.status;
        clienteDeRetorno.Genero = Genero_1.default[cliente.genero];
        clienteDeRetorno.Ranking = cliente.ranking;
        return clienteDeRetorno;
    }
}
exports.default = ClienteDAO;
