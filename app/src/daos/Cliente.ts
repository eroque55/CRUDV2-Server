import { Prisma, PrismaClient, Cliente as ClientePrisma } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import IDAO from "./IDAO";

import crypto from "crypto";

import Cliente from "../models/Cliente";
import Genero from "../enums/Genero";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class ClienteDAO implements IDAO {
   async salvar(entidadeDominio: Cliente): Promise<Cliente> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const cliente = await prisma.cliente.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(cliente);
      } catch (error: any) {
         throw new Error(`Erro ao salvar cliente: ${error.message}`);
      }
   }

   async alterar(entidadeDominio: Cliente): Promise<Cliente> {
      try {
         const dadosParaAlterar =
            this.prepararDadosParaAlterar(entidadeDominio);

         const cliente = await prisma.cliente.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaAlterar,
         });

         return this.mapearParaDominio(cliente);
      } catch (error: any) {
         throw new Error(`Erro ao alterar cliente: ${error.message}`);
      }
   }

   async excluir(entidadeDominio: Cliente): Promise<void> {
      try {
         await prisma.cliente.delete({
            where: { id: entidadeDominio.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir cliente: ${error.message}`);
      }
   }

   async consultar(): Promise<Cliente[]> {
      try {
         const clientes = await prisma.cliente.findMany({
            orderBy: { id: "asc" },
         });
         return clientes.map(this.mapearParaDominio);
      } catch (error: any) {
         throw new Error(`Erro ao consultar clientes: ${error.message}`);
      }
   }

   async selecionar(entidadeDominio: Cliente): Promise<Cliente> {
      try {
         const cliente = await prisma.cliente.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!cliente) {
            throw new Error("Pais não encontrado");
         }

         return this.mapearParaDominio(cliente);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cliente: ${error.message}`);
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
         genero: Genero[entidade.Genero as keyof typeof Genero],
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
         genero: Genero[entidade.Genero as keyof typeof Genero],
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
      clienteDeRetorno.Senha = cliente.senha;
      clienteDeRetorno.ConfirmacaoSenha = cliente.senha;

      return clienteDeRetorno;
   }
}
