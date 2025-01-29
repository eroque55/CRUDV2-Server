import { Prisma, PrismaClient, Cartao as CartaoPrisma } from "@prisma/client";
import IDAO from "./IDAO";

import Cartao from "../models/Cartao";
import BandeiraCartao from "../enums/BandeiraCartao";

const prisma = new PrismaClient();

export default class CartaoDAO implements IDAO {
   async salvar(entidadeDominio: Cartao): Promise<Cartao> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cartao = await prisma.cartao.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(cartao);
      } catch (error: any) {
         throw new Error(`Erro ao salvar cartão: ${error.message}`);
      }
   }

   async alterar(entidadeDominio: Cartao): Promise<Cartao> {
      try {
         const dadosParaAlterar =
            this.prepararDadosParaAlterar(entidadeDominio);

         const cartao = await prisma.cartao.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaAlterar,
         });

         return this.mapearParaDominio(cartao);
      } catch (error: any) {
         throw new Error(`Erro ao alterar cartão: ${error.message}`);
      }
   }

   async excluir(entidadeDominio: Cartao): Promise<void> {
      try {
         await prisma.cartao.delete({
            where: { id: entidadeDominio.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir cartão: ${error.message}`);
      }
   }

   async consultar(): Promise<Cartao[]> {
      try {
         const cartoes = await prisma.cartao.findMany();
         return cartoes.map(this.mapearParaDominio);
      } catch (error: any) {
         throw new Error(`Erro ao consultar cartões: ${error.message}`);
      }
   }

   async selecionar(entidadeDominio: Cartao): Promise<Cartao> {
      try {
         const cartao = await prisma.cartao.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!cartao) {
            throw new Error("Cartão não encontrado");
         }

         return this.mapearParaDominio(cartao);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cartão: ${error.message}`);
      }
   }

   private mascararCartao(numero: string): string {
      const tamanho = numero.length;
      const ultimosQuatro = numero.substring(tamanho - 4, tamanho);
      const cartaoMascarado = "****.****.****." + ultimosQuatro;
      return cartaoMascarado;
   }

   private mascararCvv(cvv: string): string {
      const tamanho = cvv.length;
      const cvvMascarado = "*".repeat(tamanho);
      return cvvMascarado;
   }

   private prepararDadosParaSalvar(entidade: Cartao): Prisma.CartaoCreateInput {
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

   private prepararDadosParaAlterar(
      entidade: Cartao
   ): Prisma.CartaoUpdateInput {
      return {
         preferencial: entidade.Preferencial,
      };
   }

   private mapearParaDominio(cartao: CartaoPrisma): Cartao {
      if (!cartao) {
         throw new Error("Cartão inválido para mapeamento.");
      }

      const cartaoDeRetorno = new Cartao();

      cartaoDeRetorno.Id = cartao.id;
      cartaoDeRetorno.ClienteId = cartao.clienteId;
      cartaoDeRetorno.Numero = cartao.numero;
      cartaoDeRetorno.NomeImpresso = cartao.nomeImpresso;
      cartaoDeRetorno.Cvv = cartao.cvv;
      cartaoDeRetorno.Validade = cartao.validade;
      cartaoDeRetorno.Preferencial = cartao.preferencial;
      cartaoDeRetorno.BandeiraCartao =
         BandeiraCartao[cartao.bandeiraCartao as keyof typeof BandeiraCartao];

      return cartaoDeRetorno;
   }
}
