import { Prisma, PrismaClient, Cidade as CidadePrisma } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import IDAO from "./IDAO";

import Cidade from "../models/Cidade";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class CidadeDAO implements IDAO {
   async salvar(entidadeDominio: Cidade): Promise<Cidade> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cidade = await prisma.cidade.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(cidade);
      } catch (error: any) {
         throw new Error(`Erro ao salvar cidade: ${error.message}`);
      }
   }

   async alterar(entidadeDominio: Cidade): Promise<Cidade> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cidade = await prisma.cidade.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaSalvar,
         });
         return this.mapearParaDominio(cidade);
      } catch (error: any) {
         throw new Error(`Erro ao alterar cidade: ${error.message}`);
      }
   }

   async excluir(entidadeDominio: Cidade): Promise<void> {
      try {
         await prisma.cidade.delete({
            where: { id: entidadeDominio.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir cidade: ${error.message}`);
      }
   }

   async consultar(): Promise<Cidade[]> {
      try {
         const cidades = await prisma.cidade.findMany({
            orderBy: { id: "asc" },
         });
         return cidades.map(this.mapearParaDominio);
      } catch (error: any) {
         throw new Error(`Erro ao consultar cidades: ${error.message}`);
      }
   }

   async selecionar(entidadeDominio: Cidade): Promise<Cidade> {
      try {
         const cidade = await prisma.cidade.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!cidade) {
            throw new Error("Cidade não encontrada");
         }

         return this.mapearParaDominio(cidade);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cidade: ${error.message}`);
      }
   }

   private prepararDadosParaSalvar(entidade: Cidade): Prisma.CidadeCreateInput {
      return {
         nome: entidade.Nome,
         estado: { connect: { id: entidade.EstadoId } },
      };
   }

   private mapearParaDominio(cidade: CidadePrisma): Cidade {
      if (!cidade) {
         throw new Error("Cidade inválida para mapeamento.");
      }

      const CidadeDeRetorno = new Cidade();

      CidadeDeRetorno.Id = cidade.id;
      CidadeDeRetorno.Nome = cidade.nome;
      CidadeDeRetorno.EstadoId = cidade.estadoId;

      return CidadeDeRetorno;
   }
}
