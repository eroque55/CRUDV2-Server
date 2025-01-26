import { Prisma, PrismaClient, Pais as PaisPrisma } from "@prisma/client";
import { IDAO } from "./IDAO";

import { Pais } from "../models/Pais";

const prisma = new PrismaClient();

export default class PaisDAO implements IDAO {
   async salvar(entidadeDominio: Pais): Promise<Pais | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const pais = await prisma.pais.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(pais);
      } catch (error) {
         console.error("Erro ao salvar pais:", error);
         return null;
      }
   }

   async alterar(entidadeDominio: Pais): Promise<Pais | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const pais = await prisma.pais.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(pais);
      } catch (error) {
         console.error("Erro ao alterar pais:", error);
         return null;
      }
   }

   async excluir(entidadeDominio: Pais): Promise<boolean> {
      try {
         await prisma.pais.delete({
            where: { id: entidadeDominio.Id },
         });

         return true;
      } catch (error) {
         console.error("Erro ao excluir pais:", error);
         return false;
      }
   }

   async consultar(): Promise<Pais[]> {
      try {
         const paises = await prisma.pais.findMany();
         return paises.map(this.mapearParaDominio);
      } catch (error) {
         console.error("Erro ao consultar paises:", error);
         return [];
      }
   }

   async selecionar(entidadeDominio: Pais): Promise<Pais | null> {
      try {
         const pais = await prisma.pais.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!pais) {
            throw new Error("Pais não encontrado");
         }

         return this.mapearParaDominio(pais);
      } catch (error) {
         console.error("Erro ao selecionar pais:", error);
         return null;
      }
   }

   private prepararDadosParaSalvar(
      entidadeDominio: Pais
   ): Prisma.PaisCreateInput {
      return {
         nome: entidadeDominio.Nome,
      };
   }

   private mapearParaDominio(pais: PaisPrisma): Pais {
      if (!pais) {
         throw new Error("Pais inválido para mapeamento");
      }

      const paisDeRetorno = new Pais();

      paisDeRetorno.Id = pais.id;
      paisDeRetorno.Nome = pais.nome;

      return paisDeRetorno;
   }
}
