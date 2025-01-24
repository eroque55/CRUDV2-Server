import { PrismaClient } from "@prisma/client";
import IDAO from "../IDAO";
import EntidadeDominio from "../../models/EntidadeDominio";
import Telefone from "../../models/Telefone";
import TipoTelefone from "../../models/TipoTelefone";

const prisma = new PrismaClient();

export default class TelefoneDAO implements IDAO {
  async salvar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      const telefone = await prisma.telefone.create({
        data: {
          ddd: entidade.Ddd,
          numero: entidade.Numero,
          tipoTelefone: entidade.Tipo.toString(),
          cliente: { connect: { id: entidade.ClienteId } },
        },
      });
      return new Telefone(
        telefone.id,
        telefone.clienteId,
        telefone.ddd,
        telefone.numero,
        TipoTelefone[telefone.tipoTelefone as keyof typeof TipoTelefone]
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
      const telefone = await prisma.telefone.update({
        where: { id: entidade.Id },
        data: {
          ddd: entidade.Ddd,
          numero: entidade.Numero,
          tipoTelefone: entidade.Tipo.toString(),
          cliente: { connect: { id: entidade.ClienteId } },
        },
      });
      return new Telefone(
        telefone.id,
        telefone.clienteId,
        telefone.ddd,
        telefone.numero,
        TipoTelefone[telefone.tipoTelefone as keyof typeof TipoTelefone]
      );
    } catch (error) {
      return null;
    }
  }

  async excluir(entidadeDominio: EntidadeDominio): Promise<boolean> {
    try {
      const entidade = this.validarTipo(entidadeDominio);
      await prisma.telefone.delete({
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
      const listaTelefones: Telefone[] = [];
      const telefones = await prisma.telefone.findMany();
      for (let telefone of telefones) {
        const telefoneTemp = new Telefone(
          telefone.id,
          telefone.clienteId,
          telefone.ddd,
          telefone.numero,
          TipoTelefone[telefone.tipoTelefone as keyof typeof TipoTelefone]
        );
        listaTelefones.push(telefoneTemp);
      }
      return listaTelefones;
    } catch (error) {
      return [];
    }
  }

  async selecionar(
    entidadeDominio: EntidadeDominio
  ): Promise<EntidadeDominio | null> {
    try {
      const telefone = await prisma.telefone.findUnique({
        where: { id: entidadeDominio.Id },
      });
      if (!telefone) {
        throw new Error("Telefone não encontrado");
      }
      return new Telefone(
        telefone.id,
        telefone.clienteId,
        telefone.ddd,
        telefone.numero,
        TipoTelefone[telefone.tipoTelefone as keyof typeof TipoTelefone]
      );
    } catch (error) {
      return null;
    }
  }

  validarTipo(entidade: EntidadeDominio): Telefone {
    if (entidade instanceof Telefone) {
      return entidade;
    } else {
      throw new Error("Entidade não é um Telefone");
    }
  }
}
