import { Prisma, PrismaClient, Cidade as CidadePrisma } from "@prisma/client";
import IDAO from "./IDAO";

import Cidade from "../models/Cidade";

const prisma = new PrismaClient();

export default class CidadeDAO implements IDAO {
   async salvar(entidadeDominio: Cidade): Promise<Cidade | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cidade = await prisma.cidade.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(cidade);
      } catch (error) {
         console.error("Erro ao salvar cidade:", error);
         return null;
      }
   }

   async alterar(entidadeDominio: Cidade): Promise<Cidade | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cidade = await prisma.cidade.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaSalvar,
         });
         return this.mapearParaDominio(cidade);
      } catch (error) {
         console.error("Erro ao alterar cidade:", error);
         return null;
      }
   }

   async excluir(entidadeDominio: Cidade): Promise<boolean> {
      try {
         await prisma.cidade.delete({
            where: { id: entidadeDominio.Id },
         });

         return true;
      } catch (error) {
         console.error("Erro ao excluir cidade:", error);
         return false;
      }
   }

   async consultar(): Promise<Cidade[]> {
      try {
         const cidades = await prisma.cidade.findMany();
         return cidades.map(this.mapearParaDominio);
      } catch (error) {
         console.error("Erro ao consultar cidades:", error);
         return [];
      }
   }

   async selecionar(entidadeDominio: Cidade): Promise<Cidade | null> {
      try {
         const cidade = await prisma.cidade.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!cidade) {
            throw new Error("Cidade não encontrada");
         }
         return this.mapearParaDominio(cidade);
      } catch (error) {
         console.error("Erro ao selecionar cidade:", error);
         return null;
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
