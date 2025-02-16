import { Prisma, PrismaClient, Gender } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import IDAO from "./IDAO";

import encryptPassword from "../utils/passwordEncryptor";
import CustomerModel from "../models/Customer";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class CustomerDao implements IDAO {
   async create(entity: CustomerModel): Promise<CustomerModel> {
      try {
         const customer = await prisma.customer.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(customer);
      } catch (error: any) {
         throw new Error(`Erro ao salvar cliente: ${error.message}`);
      }
   }

   async update(entity: CustomerModel): Promise<CustomerModel> {
      try {
         const customer = await prisma.customer.update({
            where: { id: entity.Id },
            data: this.updateData(entity),
         });

         return this.mapToDomain(customer);
      } catch (error: any) {
         throw new Error(`Erro ao alterar cliente: ${error.message}`);
      }
   }

   async delete(entity: CustomerModel): Promise<void> {
      try {
         await prisma.customer.delete({
            where: { id: entity.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir cliente: ${error.message}`);
      }
   }

   async read(): Promise<CustomerModel[]> {
      try {
         const customers = await prisma.customer.findMany({
            orderBy: { id: "asc" },
            omit: { password: true, confPassword: true },
         });
         return customers.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar clientes: ${error.message}`);
      }
   }

   async get(entity: CustomerModel): Promise<CustomerModel> {
      try {
         const customer = await prisma.customer.findUnique({
            where: { id: entity.Id },
            include: {
               addresses: {
                  include: {
                     city: {
                        include: { state: { include: { country: true } } },
                     },
                  },
               },
               phones: true,
               cards: true,
            },
            omit: { password: true, confPassword: true },
         });

         if (!customer) {
            throw new Error("Cliente não encontrado");
         }

         return this.mapToDomain(customer);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cliente: ${error.message}`);
      }
   }

   private saveData(entity: CustomerModel): Prisma.CustomerCreateInput {
      return {
         name: entity.Name,
         birthDate: entity.BirthDate,
         cpf: entity.Cpf,
         email: entity.Email,
         password: encryptPassword(entity.Password),
         confPassword: encryptPassword(entity.ConfPassword),
         status: entity.Status,
         gender: entity.Gender,
         ranking: entity.Ranking,
         phones: {
            create: [
               {
                  ddd: entity.Phones[0].Ddd,
                  number: entity.Phones[0].Number,
                  phoneType: entity.Phones[0].PhoneType,
               },
            ],
         },
         addresses: {
            create: [
               {
                  addressType: "COBRANCA",
                  neighborhood: entity.Addresses[0].Neighborhood,
                  number: entity.Addresses[0].Number,
                  street: entity.Addresses[0].Street,
                  complement: entity.Addresses[0].Complement,
                  cep: entity.Addresses[0].Cep,
                  cityId: entity.Addresses[0].City.Id,
                  nickname: entity.Addresses[0].Nickname,
                  residenceType: entity.Addresses[0].ResidenceType,
                  streetType: entity.Addresses[0].StreetType,
               },
               {
                  addressType: "ENTREGA",
                  neighborhood: entity.Addresses[1].Neighborhood,
                  number: entity.Addresses[1].Number,
                  street: entity.Addresses[1].Street,
                  complement: entity.Addresses[1].Complement,
                  cep: entity.Addresses[1].Cep,
                  cityId: entity.Addresses[1].City.Id,
                  nickname: entity.Addresses[1].Nickname,
                  residenceType: entity.Addresses[1].ResidenceType,
                  streetType: entity.Addresses[1].StreetType,
               },
            ],
         },
      };
   }

   private updateData(entity: CustomerModel): Prisma.CustomerUpdateInput {
      return {
         name: entity.Name,
         birthDate: entity.BirthDate,
         cpf: entity.Cpf,
         email: entity.Email,
         status: entity.Status,
         gender: entity.Gender,
         ranking: entity.Ranking,
      };
   }

   private mapToDomain(customer: any): CustomerModel {
      if (!customer) {
         throw new Error("Cliente inválido para mapeamento.");
      }

      return { ...customer };
   }
}
