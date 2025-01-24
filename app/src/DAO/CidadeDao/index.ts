import { PrismaClient } from "@prisma/client";
import IDAO from "../Idao";
import EntidadeDominio from "../../models/EntidadeDominio";
import Cidade from "../../models/Cidade";

const prisma = new PrismaClient();

export class CidadeDAO implements IDAO {
  async salvar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const cidade = await prisma.cidade.create({
        data: {
          nome: entidade.Nome,
          estado: { connect: { id: entidade.EstadoId } },
        },
      });
      return new Cidade(cidade.id, cidade.nome, cidade.estadoId);
    } catch (error) {
      return null;
    }
  }

  async alterar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const cidade = await prisma.cidade.update({
        where: { id: entidade.Id },
        data: {
          nome: entidade.Nome,
          estado: { connect: { id: entidade.EstadoId } },
        },
      });
      return new Cidade(cidade.id, cidade.nome, cidade.estadoId);
    } catch (error) {
      return null;
    }
  }

  async excluir(entidadeDominio: EntidadeDominio): Promise<boolean> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      await prisma.cidade.delete({
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
      const listaCidades: Cidade[] = [];
      const cidades = await prisma.cidade.findMany();
      for (let cidade of cidades) {
        const cidadeTemp = new Cidade(cidade.id, cidade.nome, cidade.estadoId);
        listaCidades.push(cidadeTemp);
      }
      return listaCidades;
    } catch (error) {
      return [];
    }
  }

  async selecionar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const cidade = await prisma.cidade.findUnique({
        where: { id: entidadeDominio.Id },
      });
      if (!cidade) {
        throw new Error("Cidade não encontrada");
      }
      return new Cidade(cidade.id, cidade.nome, cidade.estadoId);
    } catch (error) {
      return null;
    }
  }

  validarTipo(entidade: EntidadeDominio): Cidade {
    if (entidade instanceof Cidade) {
      return entidade;
    } else {
      throw new Error("Entidade não é uma Cidade");
    }
  }
}
