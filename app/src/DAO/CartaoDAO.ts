import { Cartao } from "../Entitys/Cartao";
import { EntidadeDominio } from "../Entitys/EntidadeDominio";
import { PrismaClient } from "@prisma/client";
import { IDAO } from "./IDAO";
import { BandeiraCartao } from "../Entitys/BandeiraCartao";

const prisma = new PrismaClient();

export class CartaoDAO implements IDAO {
  async salvar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const cartao = await prisma.cartao.create({
        data: {
          cliente: { connect: { id: entidade.ClienteId } },
          numero: entidade.Numero,
          nomeImpresso: entidade.NomeImpresso,
          cvv: entidade.Cvv,
          validade: entidade.Validade,
          preferencial: entidade.Preferencial,
          bandeiraCartao: entidade.BandeiraCartao.toString()
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
        const bandeiraTemp = BandeiraCartao[cartao.bandeiraCartao as keyof typeof BandeiraCartao];
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
      const entidade = await prisma.cartao.findUnique({
        where: { id: entidadeDominio.Id },
      });
      if (!entidade) {
        throw new Error("Cartão não encontrado");
      }
      return new Cartao(
        entidade.id,
        entidade.clienteId,
        entidade.numero,
        entidade.nomeImpresso,
        entidade.cvv,
        entidade.validade,
        entidade.preferencial,
        BandeiraCartao[entidade.bandeiraCartao as keyof typeof BandeiraCartao]
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
}
