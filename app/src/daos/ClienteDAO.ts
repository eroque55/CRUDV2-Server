import { Prisma, PrismaClient, Cliente as ClientePrisma } from "@prisma/client";
import IDAO from "./IDAO";

import crypto from "crypto";

import Cliente from "../models/Cliente";
import Genero from "../enums/Genero";

const prisma = new PrismaClient();

export default class ClienteDAO implements IDAO {
   async salvar(entidadeDominio: Cliente): Promise<Cliente | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cliente = await prisma.cliente.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(cliente);
      } catch (error) {
         console.error("Erro ao salvar cliente:", error);
         return null;
      }
   }

   async alterar(entidadeDominio: Cliente): Promise<Cliente | null> {
      try {
         const dadosParaAlterar =
            this.prepararDadosParaAlterar(entidadeDominio);

         const cliente = await prisma.cliente.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaAlterar,
         });

         return this.mapearParaDominio(cliente);
      } catch (error) {
         console.error("Erro ao alterar cliente:", error);
         return null;
      }
   }

   async excluir(entidadeDominio: Cliente): Promise<boolean> {
      try {
         await prisma.cliente.delete({
            where: { id: entidadeDominio.Id },
         });

         return true;
      } catch (error) {
         console.error("Erro ao excluir cliente:", error);
         return false;
      }
   }

   async consultar(): Promise<Cliente[]> {
      try {
         const clientes = await prisma.cliente.findMany();
         return clientes.map(this.mapearParaDominio);
      } catch (error) {
         console.error("Erro ao consultar clientes:", error);
         return [];
      }
   }

   async selecionar(entidadeDominio: Cliente): Promise<Cliente | null> {
      try {
         const cliente = await prisma.cliente.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!cliente) {
            throw new Error("Pais não encontrado");
         }

         return this.mapearParaDominio(cliente);
      } catch (error) {
         console.error("Erro ao selecionar cliente:", error);
         return null;
      }
   }

   private criptografarSenha(senha: string): string {
      try {
         const hash = crypto.createHash("sha256").update(senha).digest("hex");
         return hash;
      } catch (error) {
         return "";
      }
   }

   private prepararDadosParaSalvar(
      entidade: Cliente
   ): Prisma.ClienteCreateInput {
      return {
         nome: entidade.Nome,
         dataNascimento: entidade.DataNascimento,
         cpf: entidade.Cpf,
         email: entidade.Email,
         senha: this.criptografarSenha(entidade.Senha),
         status: entidade.Status,
         genero: entidade.Genero.toString(),
         ranking: entidade.Ranking,
      };
   }

   private prepararDadosParaAlterar(
      entidade: Cliente
   ): Prisma.ClienteUpdateInput {
      return {
         nome: entidade.Nome,
         dataNascimento: entidade.DataNascimento,
         cpf: entidade.Cpf,
         email: entidade.Email,
         status: entidade.Status,
         genero: entidade.Genero.toString(),
         ranking: entidade.Ranking,
      };
   }

   private mapearParaDominio(cliente: ClientePrisma): Cliente {
      if (!cliente) {
         throw new Error("Cliente inválido para mapeamento.");
      }

      const clienteDeRetorno = new Cliente();

      clienteDeRetorno.Id = cliente.id;
      clienteDeRetorno.Nome = cliente.nome;
      clienteDeRetorno.DataNascimento = cliente.dataNascimento;
      clienteDeRetorno.Cpf = cliente.cpf;
      clienteDeRetorno.Email = cliente.email;
      clienteDeRetorno.Status = cliente.status;
      clienteDeRetorno.Genero = Genero[cliente.genero as keyof typeof Genero];
      clienteDeRetorno.Ranking = cliente.ranking;

      return clienteDeRetorno;
   }
}
