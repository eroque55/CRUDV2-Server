import { Prisma, PrismaClient, Pais as PaisPrisma } from "@prisma/client";
import IDAO from "./IDAO";

import Pais from "../models/Pais";

const prisma = new PrismaClient();

export default class PaisDAO implements IDAO {
   async salvar(entidadeDominio: Pais): Promise<Pais> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const pais = await prisma.pais.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(pais);
      } catch (error: any) {
         throw new Error(`Erro ao salvar pais: ${error.message}`);
      }
   }

   async alterar(entidadeDominio: Pais): Promise<Pais> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const pais = await prisma.pais.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(pais);
      } catch (error: any) {
         throw new Error(`Erro ao alterar pais: ${error.message}`);
      }
   }

   async excluir(entidadeDominio: Pais): Promise<void> {
      try {
         await prisma.pais.delete({
            where: { id: entidadeDominio.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir pais: ${error.message}`);
      }
   }

   async consultar(): Promise<Pais[]> {
      try {
         const paises = await prisma.pais.findMany();
         return paises.map(this.mapearParaDominio);
      } catch (error: any) {
         throw new Error(`Erro ao consultar paises: ${error.message}`);
      }
   }

   async selecionar(entidadeDominio: Pais): Promise<Pais> {
      try {
         const pais = await prisma.pais.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!pais) {
            throw new Error("Pais não encontrado");
         }

         return this.mapearParaDominio(pais);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar pais: ${error.message}`);
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
