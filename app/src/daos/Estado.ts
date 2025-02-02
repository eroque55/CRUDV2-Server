import { Prisma, PrismaClient, Estado as EstadoPrisma } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import IDAO from "./IDAO";

import Estado from "../models/Estado";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class EstadoDAO implements IDAO {
   async salvar(entidadeDominio: Estado): Promise<Estado> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const estado = await prisma.estado.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(estado);
      } catch (error: any) {
         throw new Error(`Erro ao salvar estado: ${error.message}`);
      }
   }

   async alterar(entidadeDominio: Estado): Promise<Estado> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const estado = await prisma.estado.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(estado);
      } catch (error: any) {
         throw new Error(`Erro ao alterar estado: ${error.message}`);
      }
   }

   async excluir(entidadeDominio: Estado): Promise<void> {
      try {
         await prisma.estado.delete({
            where: { id: entidadeDominio.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir estado: ${error.message}`);
      }
   }

   async consultar(): Promise<Estado[]> {
      try {
         const estados = await prisma.estado.findMany({
            orderBy: { id: "asc" },
         });
         return estados.map(this.mapearParaDominio);
      } catch (error: any) {
         throw new Error(`Erro ao consultar estados: ${error.message}`);
      }
   }

   async selecionar(entidadeDominio: Estado): Promise<Estado> {
      try {
         const estado = await prisma.estado.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!estado) {
            throw new Error("Estado não encontrado");
         }

         return this.mapearParaDominio(estado);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar estado: ${error.message}`);
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
