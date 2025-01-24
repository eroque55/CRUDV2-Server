import { PrismaClient } from "@prisma/client";
import Cartao from "../../models/Cartao";
import EntidadeDominio from "../../models/EntidadeDominio";
import IDAO from "../Idao";
import BandeiraCartao from "../../models/BandeiraCartao";

const prisma = new PrismaClient();

export default class CartaoDAO implements IDAO {
  async salvar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const cartao = await prisma.cartao.create({
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
      return new Cartao(
        cartao.id,
        cartao.clienteId,
        cartao.numero,
        cartao.nomeImpresso,
        cartao.cvv,
        cartao.validade,
        cartao.preferencial,
        BandeiraCartao[cartao.bandeiraCartao as keyof typeof BandeiraCartao]
      );
    } catch (error) {
      return null;
    }
  }

  async alterar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const cartao = await prisma.cartao.update({
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
      return new Cartao(
        cartao.id,
        cartao.clienteId,
        cartao.numero,
        cartao.nomeImpresso,
        cartao.cvv,
        cartao.validade,
        cartao.preferencial,
        BandeiraCartao[cartao.bandeiraCartao as keyof typeof BandeiraCartao]
      );
    } catch (error) {
      return null;
    }
  }

  async excluir(entidadeDominio: EntidadeDominio): Promise<boolean> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      await prisma.cartao.delete({
        where: { id: entidade.Id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async consultar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio[]> {
    try {
      const listaCartoes: Cartao[] = [];
      const cartoes = await prisma.cartao.findMany();
      for (let cartao of cartoes) {
        const bandeiraTemp =
          BandeiraCartao[cartao.bandeiraCartao as keyof typeof BandeiraCartao];
        const cartaoTemp = new Cartao(
          cartao.id,
          cartao.clienteId,
          cartao.numero,
          cartao.nomeImpresso,
          cartao.cvv,
          cartao.validade,
          cartao.preferencial,
          bandeiraTemp
        );
        listaCartoes.push(cartaoTemp);
      }
      return listaCartoes;
    } catch (error) {
      return [];
    }
  }

  async selecionar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const cartao = await prisma.cartao.findUnique({
        where: { id: entidadeDominio.Id },
      });
      if (!cartao) {
        throw new Error("Cartão não encontrado");
      }
      return new Cartao(
        cartao.id,
        cartao.clienteId,
        cartao.numero,
        cartao.nomeImpresso,
        cartao.cvv,
        cartao.validade,
        cartao.preferencial,
        BandeiraCartao[cartao.bandeiraCartao as keyof typeof BandeiraCartao]
      );
    } catch (error) {
      return null;
    }
  }

  validarTipo(entidade: EntidadeDominio): Cartao {
    if (entidade instanceof Cartao) {
      return entidade;
    } else {
      throw new Error("Entidade não é um Cartão");
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
}
