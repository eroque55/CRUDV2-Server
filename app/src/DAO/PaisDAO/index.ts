import { PrismaClient } from "@prisma/client";
import IDAO from "../Idao";
import EntidadeDominio from "../../models/EntidadeDominio";
import Pais from "../../models/Pais";

const prisma = new PrismaClient();

export class PaisDAO implements IDAO {
  async salvar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const pais = await prisma.pais.create({
        data: {
          nome: entidade.Nome,
        },
      });
      return new Pais(pais.id, pais.nome);
    } catch (error) {
      return null;
    }
  }

  async alterar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const pais = await prisma.pais.update({
        where: { id: entidade.Id },
        data: {
          nome: entidade.Nome,
        },
      });
      return new Pais(pais.id, pais.nome);
    } catch (error) {
      return null;
    }
  }

  async excluir(entidadeDominio: EntidadeDominio): Promise<boolean> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      await prisma.pais.delete({
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
      const listaPaises: Pais[] = [];
      const paises = await prisma.pais.findMany();
      for (let pais of paises) {
        const paisTemp = new Pais(pais.id, pais.nome);
        listaPaises.push(paisTemp);
      }
      return listaPaises;
    } catch (error) {
      return [];
    }
  }

  async selecionar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const pais = await prisma.pais.findUnique({
        where: { id: entidadeDominio.Id },
      });
      if (!pais) {
        throw new Error("Pais não encontrado");
      }
      return new Pais(pais.id, pais.nome);
    } catch (error) {
      return null;
    }
  }

  validarTipo(entidade: EntidadeDominio): Pais {
    if (entidade instanceof Pais) {
      return entidade;
    } else {
      throw new Error("Entidade não é um Pais");
    }
  }
}
