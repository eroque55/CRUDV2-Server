import { PrismaClient } from "@prisma/client";
import IDAO from "../IDAO";
import EntidadeDominio from "../../models/EntidadeDominio";
import Estado from "../../models/Estado";

const prisma = new PrismaClient();

export default class EstadoDAO implements IDAO {
  async salvar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const estado = await prisma.estado.create({
        data: {
          nome: entidade.Nome,
          pais: { connect: { id: entidade.PaisId } },
        },
      });
      return new Estado(estado.id, estado.nome, estado.paisId);
    } catch (error) {
      return null;
    }
  }

  async alterar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const estado = await prisma.estado.update({
        where: { id: entidade.Id },
        data: {
          nome: entidade.Nome,
          pais: { connect: { id: entidade.PaisId } },
        },
      });
      return new Estado(estado.id, estado.nome, estado.paisId);
    } catch (error) {
      return null;
    }
  }

  async excluir(entidadeDominio: EntidadeDominio): Promise<boolean> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      await prisma.estado.delete({
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
      const listaEstados: Estado[] = [];
      const estados = await prisma.estado.findMany();
      for (let estado of estados) {
        const estadoTemp = new Estado(estado.id, estado.nome, estado.paisId);
        listaEstados.push(estadoTemp);
      }
      return listaEstados;
    } catch (error) {
      return [];
    }
  }

  async selecionar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const estado = await prisma.estado.findUnique({
        where: { id: entidadeDominio.Id },
      });
      if (!estado) {
        throw new Error("Estado não encontrado");
      }
      return new Estado(estado.id, estado.nome, estado.paisId);
    } catch (error) {
      return null;
    }
  }

  validarTipo(entidade: EntidadeDominio): Estado {
    if (entidade instanceof Estado) {
      return entidade;
    } else {
      throw new Error("Entidade não é um Estado");
    }
  }
}
