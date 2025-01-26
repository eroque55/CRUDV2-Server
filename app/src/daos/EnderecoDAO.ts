import {
   Prisma,
   PrismaClient,
   Endereco as EnderecoPrisma,
} from "@prisma/client";
import { IDAO } from "./IDAO";

import { Endereco } from "../models/Endereco";
import { TipoEndereco } from "../enums/TipoEndereco";
import { TipoLogradouro } from "../enums/TipoLogradouro";
import { TipoResidencia } from "../enums/TipoResidencia";

const prisma = new PrismaClient();

export default class EnderecoDAO implements IDAO {
   async salvar(entidadeDominio: Endereco): Promise<Endereco | null> {
      try {
         const dadosParaSalvar = this.prepararDadosParaSalvar(entidadeDominio);

         const endereco = await prisma.endereco.create({
            data: dadosParaSalvar,
         });

         return this.mapearParaDominio(endereco);
      } catch (error) {
         console.error("Erro ao salvar endereço:", error);
         return null;
      }
   }

   async alterar(entidadeDominio: Endereco): Promise<Endereco | null> {
      try {
         const dadosParaAlterar =
            this.prepararDadosParaAlterar(entidadeDominio);

         const endereco = await prisma.endereco.update({
            where: { id: entidadeDominio.Id },
            data: dadosParaAlterar,
         });

         return this.mapearParaDominio(endereco);
      } catch (error) {
         console.error("Erro ao alterar endereço:", error);
         return null;
      }
   }

   async excluir(entidadeDominio: Endereco): Promise<boolean> {
      try {
         await prisma.endereco.delete({
            where: { id: entidadeDominio.Id },
         });

         return true;
      } catch (error) {
         return false;
      }
   }

   async consultar(): Promise<Endereco[]> {
      try {
         const enderecos = await prisma.endereco.findMany();
         return enderecos.map(this.mapearParaDominio);
      } catch (error) {
         console.error("Erro ao consultar endereços:", error);
         return [];
      }
   }

   async selecionar(entidadeDominio: Endereco): Promise<Endereco | null> {
      try {
         const endereco = await prisma.endereco.findUnique({
            where: { id: entidadeDominio.Id },
         });

         if (!endereco) {
            throw new Error("Endereco não encontrado");
         }

         return this.mapearParaDominio(endereco);
      } catch (error) {
         console.error("Erro ao selecionar endereço:", error);
         return null;
      }
   }

   private prepararDadosParaSalvar(
      entidade: Endereco
   ): Prisma.EnderecoCreateInput {
      return {
         cliente: { connect: { id: entidade.ClienteId } },
         apelido: entidade.Apelido,
         logradouro: entidade.Logradouro,
         numero: entidade.Numero,
         bairro: entidade.Bairro,
         cep: entidade.Cep,
         observacoes: entidade.Observacoes,
         cidade: { connect: { id: entidade.Cidade.Id } },
         tipoEndereco: entidade.TipoEndereco.toString(),
         tipoLogradouro: entidade.TipoLogradouro.toString(),
         tipoResidencia: entidade.TipoResidencia.toString(),
      };
   }

   private prepararDadosParaAlterar(
      entidade: Endereco
   ): Prisma.EnderecoUpdateInput {
      return {
         apelido: entidade.Apelido,
         logradouro: entidade.Logradouro,
         numero: entidade.Numero,
         bairro: entidade.Bairro,
         cep: entidade.Cep,
         observacoes: entidade.Observacoes,
         cidade: { connect: { id: entidade.Cidade.Id } },
         tipoLogradouro: entidade.TipoLogradouro.toString(),
         tipoResidencia: entidade.TipoResidencia.toString(),
      };
   }

   private mapearParaDominio(endereco: EnderecoPrisma): Endereco {
      if (!endereco) {
         throw new Error("Endereco inválido para mapeamento.");
      }

      const enderecoDeRetorno = new Endereco();

      enderecoDeRetorno.Id = endereco.id;
      enderecoDeRetorno.ClienteId = endereco.clienteId;
      enderecoDeRetorno.Apelido = endereco.apelido;
      enderecoDeRetorno.Logradouro = endereco.logradouro;
      enderecoDeRetorno.Numero = endereco.numero;
      enderecoDeRetorno.Bairro = endereco.bairro;
      enderecoDeRetorno.Cep = endereco.cep;
      enderecoDeRetorno.Observacoes = endereco.observacoes;
      enderecoDeRetorno.Cidade.Id = endereco.cidadeId;
      enderecoDeRetorno.TipoEndereco =
         TipoEndereco[endereco.tipoEndereco as keyof typeof TipoEndereco];
      enderecoDeRetorno.TipoLogradouro =
         TipoLogradouro[endereco.tipoLogradouro as keyof typeof TipoLogradouro];
      enderecoDeRetorno.TipoResidencia =
         TipoResidencia[endereco.tipoResidencia as keyof typeof TipoResidencia];

      return enderecoDeRetorno;
   }
}
