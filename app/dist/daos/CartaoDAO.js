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
const Cartao_1 = __importDefault(require("../models/Cartao"));
const BandeiraCartao_1 = __importDefault(require("../enums/BandeiraCartao"));
const prisma = new client_1.PrismaClient();
class CartaoDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);
                const cartao = yield prisma.cartao.create({
                    data: dadosParaSalvar,
                });
                return this.mapearParaDominio(cartao);
            }
            catch (error) {
                console.error("Erro ao salvar cartão:", error);
                return null;
            }
        });
    }
    alterar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosParaAlterar = this.prepararDadosParaAlterar(entidadeDominio);
                const cartao = yield prisma.cartao.update({
                    where: { id: entidadeDominio.Id },
                    data: dadosParaAlterar,
                });
                return this.mapearParaDominio(cartao);
            }
            catch (error) {
                console.error("Erro ao alterar cartão:", error);
                return null;
            }
        });
    }
    excluir(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.cartao.delete({
                    where: { id: entidadeDominio.Id },
                });
                return true;
            }
            catch (error) {
                console.error("Erro ao excluir cartão:", error);
                return false;
            }
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartoes = yield prisma.cartao.findMany();
                return cartoes.map(this.mapearParaDominio);
            }
            catch (error) {
                console.error("Erro ao consultar cartões:", error);
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartao = yield prisma.cartao.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!cartao) {
                    throw new Error("Cartão não encontrado");
                }
                return this.mapearParaDominio(cartao);
            }
            catch (error) {
                throw new Error("Cartao não encontrado");
            }
        });
    }
    mascararCartao(numero) {
        const tamanho = numero.length;
        const ultimosQuatro = numero.substring(tamanho - 4, tamanho);
        const cartaoMascarado = "****.****.****." + ultimosQuatro;
        return cartaoMascarado;
    }
    mascararCvv(cvv) {
        const tamanho = cvv.length;
        const cvvMascarado = "*".repeat(tamanho);
        return cvvMascarado;
    }
    prepararDadosParaSalvar(entidade) {
        return {
            cliente: { connect: { id: entidade.ClienteId } },
            numero: this.mascararCartao(entidade.Numero),
            nomeImpresso: entidade.NomeImpresso,
            cvv: this.mascararCvv(entidade.Cvv),
            validade: entidade.Validade,
            preferencial: entidade.Preferencial,
            bandeiraCartao: entidade.BandeiraCartao.toString(),
        };
    }
    prepararDadosParaAlterar(entidade) {
        return {
            preferencial: entidade.Preferencial,
        };
    }
    mapearParaDominio(cartao) {
        if (!cartao) {
            throw new Error("Cartão inválido para mapeamento.");
        }
        const cartaoDeRetorno = new Cartao_1.default();
        cartaoDeRetorno.Id = cartao.id;
        cartaoDeRetorno.ClienteId = cartao.clienteId;
        cartaoDeRetorno.Numero = cartao.numero;
        cartaoDeRetorno.NomeImpresso = cartao.nomeImpresso;
        cartaoDeRetorno.Cvv = cartao.cvv;
        cartaoDeRetorno.Validade = cartao.validade;
        cartaoDeRetorno.Preferencial = cartao.preferencial;
        cartaoDeRetorno.BandeiraCartao =
            BandeiraCartao_1.default[cartao.bandeiraCartao];
        return cartaoDeRetorno;
    }
}
exports.default = CartaoDAO;
