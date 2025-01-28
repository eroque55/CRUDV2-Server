import { Prisma, PrismaClient, Estado as EstadoPrisma } from "@prisma/client";
import IDAO from "./IDAO";

import Estado from "../models/Estado";

const prisma = new PrismaClient();

export default class EstadoDAO implements IDAO {
   async salvar(entidadeDominio: Estado): Promise<Estado | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const estado = await prisma.estado.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(estado);
      } catch (error) {
         console.error("Erro ao salvar estado:", error);
         return null;
      }
   }

   async alterar(entidadeDominio: Estado): Promise<Estado | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const estado = await prisma.estado.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(estado);
      } catch (error) {
         console.error("Erro ao alterar estado:", error);
         return null;
      }
   }

   async excluir(entidadeDominio: Estado): Promise<boolean> {
      try {
         await prisma.estado.delete({
            where: { id: entidadeDominio.Id },
         });

         return true;
      } catch (error) {
         console.error("Erro ao excluir estado:", error);
         return false;
      }
   }

   async consultar(): Promise<Estado[]> {
      try {
         const estados = await prisma.estado.findMany();
         return estados.map(this.mapearParaDominio);
      } catch (error) {
         console.error("Erro ao consultar estados:", error);
         return [];
      }
   }

   async selecionar(entidadeDominio: Estado): Promise<Estado | null> {
      try {
         const estado = await prisma.estado.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!estado) {
            throw new Error("Estado não encontrado");
         }

         return this.mapearParaDominio(estado);
      } catch (error) {
         console.error("Erro ao selecionar estado:", error);
         return null;
      }
   }

   private prepararDadosParaSalvar(entidade: Estado): Prisma.EstadoCreateInput {
      return {
         nome: entidade.Nome,
         pais: { connect: { id: entidade.PaisId } },
      };
   }
   private mapearParaDominio(estado: EstadoPrisma): Estado {
      if (!estado) {
         throw new Error("Estado inválido para mapeamento");
      }

      const estadoDeRetorno = new Estado();

      estadoDeRetorno.Id = estado.id;
      estadoDeRetorno.Nome = estado.nome;
      estadoDeRetorno.PaisId = estado.paisId;

      return estadoDeRetorno;
   }
}
