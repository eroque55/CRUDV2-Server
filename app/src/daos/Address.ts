import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import IDAO from "./IDAO";
import AddressModel from "../models/Address";

class AddressDao implements IDAO {
   async create(entity: AddressModel): Promise<AddressModel> {
      try {
         const address = await prisma.address.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(address);
      } catch (error: any) {
         throw new Error(`Erro ao salvar endereço: ${error}`);
      }
   }

   async update(entity: AddressModel): Promise<AddressModel> {
      try {
         const address = await prisma.address.update({
            where: { id: entity.Id },
            data: this.updateData(entity),
         });

         return this.mapToDomain(address);
      } catch (error: any) {
         throw new Error(`Erro ao alterar endereço: ${error}`);
      }
   }

   async delete(entity: AddressModel): Promise<void> {
      try {
         await prisma.address.delete({
            where: { id: entity.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir endereço: ${error.message}`);
      }
   }

   async read(): Promise<AddressModel[]> {
      try {
         const addresses = await prisma.address.findMany({
            orderBy: { id: "asc" },
            include: {
               city: {
                  include: {
                     state: {
                        include: {
                           country: true,
                        },
                     },
                  },
               },
            },
         });
         return addresses.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar endereços: ${error.message}`);
      }
   }

   async get(entity: AddressModel): Promise<AddressModel> {
      try {
         const address = await prisma.address.findUnique({
            where: { id: entity.Id },
            include: {
               city: {
                  include: {
                     state: {
                        include: {
                           country: true,
                        },
                     },
                  },
               },
            },
         });

         if (!address) {
            throw new Error("Endereco não encontrado");
         }

         return this.mapToDomain(address);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar endereço: ${error.message}`);
      }
   }

   private saveData(entity: AddressModel): Prisma.AddressCreateInput {
      return {
         customer: { connect: { id: entity.Customer?.["id"] } },
         nickname: entity.Nickname || "",
         street: entity.Street || "",
         number: entity.Number || 0,
         neighborhood: entity.Neighborhood || "",
         cep: entity.Cep || "",
         complement: entity.Complement || "",
         city: { connect: { id: entity?.City?.["id"] } },
         addressType: entity.AddressType || "COBRANCA",
         streetType: entity.StreetType || "RUA",
         residenceType: entity.ResidenceType || "CASA",
      };
   }

   private updateData(entity: AddressModel): Prisma.AddressUpdateInput {
      return {
         nickname: entity.Nickname,
         street: entity.Street,
         number: entity.Number,
         neighborhood: entity.Neighborhood,
         cep: entity.Cep,
         complement: entity.Complement,
         city: { connect: { id: entity?.City?.["id"] } },
         streetType: entity.StreetType,
         residenceType: entity.ResidenceType,
      };
   }

   private mapToDomain(address: any): AddressModel {
      if (!address) {
         throw new Error("Endereco inválido para mapeamento.");
      }

      return { ...address };
   }
}

export default AddressDao;
