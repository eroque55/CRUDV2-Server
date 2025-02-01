import {
   Prisma,
   PrismaClient,
   Telefone as TelefonePrisma,
} from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import IDAO from "./IDAO";

import Telefone from "../models/Telefone";
import TipoTelefone from "../enums/TipoTelefone";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class TelefoneDAO implements IDAO {
   async salvar(entidadeDominio: Telefone): Promise<Telefone> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const telefone = await prisma.telefone.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(telefone);
      } catch (error: any) {
         throw new Error(`Erro ao salvar telefone: ${error.message}`);
      }
   }

   async alterar(entidadeDominio: Telefone): Promise<Telefone> {
      try {
         const dadosParaAlterar =
            this.prepararDadosParaAlterar(entidadeDominio);

         const telefone = await prisma.telefone.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaAlterar,
         });

         return this.mapearParaDominio(telefone);
      } catch (error: any) {
         throw new Error(`Erro ao alterar telefone: ${error.message}`);
      }
   }

   async excluir(entidadeDominio: Telefone): Promise<void> {
      try {
         await prisma.telefone.delete({
            where: { id: entidadeDominio.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir telefone: ${error.message}`);
      }
   }

   async consultar(): Promise<Telefone[]> {
      try {
         const telefones = await prisma.telefone.findMany();
         return telefones.map(this.mapearParaDominio);
      } catch (error: any) {
         throw new Error(`Erro ao consultar telefones: ${error.message}`);
      }
   }

   async selecionar(entidadeDominio: Telefone): Promise<Telefone> {
      try {
         const telefone = await prisma.telefone.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!telefone) {
            throw new Error("Telefone não encontrado");
         }

         return this.mapearParaDominio(telefone);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar telefone: ${error.message}`);
      }
   }

   private prepararDadosParaSalvar(
      entidade: Telefone
   ): Prisma.TelefoneCreateInput {
      return {
         ddd: entidade.Ddd,
         numero: entidade.Numero,
         tipoTelefone: entidade.Tipo.toString(),
         cliente: { connect: { id: entidade.ClienteId } },
      };
   }

   private prepararDadosParaAlterar(
      entidade: Telefone
   ): Prisma.TelefoneUpdateInput {
      return {
         ddd: entidade.Ddd,
         numero: entidade.Numero,
         tipoTelefone: entidade.Tipo.toString(),
      };
   }

   private mapearParaDominio(telefone: TelefonePrisma): Telefone {
      if (!telefone) {
         throw new Error("Telefone invalido para mapeamento.");
      }

      const telefoneDeRetorno = new Telefone();

      telefoneDeRetorno.Id = telefone.id;
      telefoneDeRetorno.ClienteId = telefone.clienteId;
      telefoneDeRetorno.Ddd = telefone.ddd;
      telefoneDeRetorno.Numero = telefone.numero;
      telefoneDeRetorno.Tipo =
         TipoTelefone[telefone.tipoTelefone as keyof typeof TipoTelefone];

      return telefoneDeRetorno;
   }
}
