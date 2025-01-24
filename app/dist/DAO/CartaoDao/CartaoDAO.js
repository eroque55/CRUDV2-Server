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
exports.CartaoDAO = void 0;
const Cartao_1 = require("../../Entitys/Cartao");
const client_1 = require("@prisma/client");
const BandeiraCartao_1 = require("../../Entitys/BandeiraCartao");
const prisma = new client_1.PrismaClient();
class CartaoDAO {
    salvar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = this.validarTipo(entidadeDominio);
                const cartao = yield prisma.cartao.create({
                    data: {
                        cliente: { connect: { id: entidade.ClienteId } },
                        numero: this.mascararCartao(entidade.Numero),
                        nomeImpresso: entidade.NomeImpresso,
                        cvv: this.mascararCvv(entidade.Cvv),
                        validade: entidade.Validade,
                        preferencial: entidade.Preferencial,
                        bandeiraCartao: entidade.BandeiraCartao.toString(),
                    },
                });
                return new Cartao_1.Cartao(cartao.id, cartao.clienteId, cartao.numero, cartao.nomeImpresso, cartao.cvv, cartao.validade, cartao.preferencial, BandeiraCartao_1.BandeiraCartao[cartao.bandeiraCartao]);
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
                const cartao = yield prisma.cartao.update({
                    where: { id: entidade.Id },
                    data: {
                        cliente: { connect: { id: entidade.ClienteId } },
                        numero: entidade.Numero,
                        nomeImpresso: entidade.NomeImpresso,
                        cvv: entidade.Cvv,
                        validade: entidade.Validade,
                        preferencial: entidade.Preferencial,
                        bandeiraCartao: entidade.BandeiraCartao.toString(),
                    },
                });
                return new Cartao_1.Cartao(cartao.id, cartao.clienteId, cartao.numero, cartao.nomeImpresso, cartao.cvv, cartao.validade, cartao.preferencial, BandeiraCartao_1.BandeiraCartao[cartao.bandeiraCartao]);
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
                yield prisma.cartao.delete({
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
                const listaCartoes = [];
                const cartoes = yield prisma.cartao.findMany();
                for (let cartao of cartoes) {
                    const bandeiraTemp = BandeiraCartao_1.BandeiraCartao[cartao.bandeiraCartao];
                    const cartaoTemp = new Cartao_1.Cartao(cartao.id, cartao.clienteId, cartao.numero, cartao.nomeImpresso, cartao.cvv, cartao.validade, cartao.preferencial, bandeiraTemp);
                    listaCartoes.push(cartaoTemp);
                }
                return listaCartoes;
            }
            catch (error) {
                return [];
            }
        });
    }
    selecionar(entidadeDominio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entidade = yield prisma.cartao.findUnique({
                    where: { id: entidadeDominio.Id },
                });
                if (!entidade) {
                    throw new Error("Cartão não encontrado");
                }
                return new Cartao_1.Cartao(entidade.id, entidade.clienteId, entidade.numero, entidade.nomeImpresso, entidade.cvv, entidade.validade, entidade.preferencial, BandeiraCartao_1.BandeiraCartao[entidade.bandeiraCartao]);
            }
            catch (error) {
                return null;
            }
        });
    }
    validarTipo(entidade) {
        if (entidade instanceof Cartao_1.Cartao) {
            return entidade;
        }
        else {
            throw new Error("Entidade não é um Cartão");
        }
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
}
exports.CartaoDAO = CartaoDAO;
