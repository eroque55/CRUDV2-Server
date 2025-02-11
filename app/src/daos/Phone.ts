import { Prisma, PrismaClient, Phone as PrismaPhone } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import IDAO from "./IDAO";

import PhoneModel from "../models/Phone";
import PhoneType from "../enums/PhoneType";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class Phone implements IDAO {
   async create(entity: PhoneModel): Promise<PhoneModel> {
      try {
         const phone = await prisma.phone.create({
            data: this.saveData(entity),
         });

         if (!phone) {
            throw new Error("Telefone não encontrado");
         }
         return this.mapToDomain(phone);
      } catch (error: any) {
         throw new Error(`Erro ao salvar telefone: ${error.message}`);
      }
   }

   async update(entity: PhoneModel): Promise<PhoneModel> {
      try {
         const phone = await prisma.phone.update({
            where: { id: entity.Id },
            data: this.updateData(entity),
         });

         return this.mapToDomain(phone);
      } catch (error: any) {
         throw new Error(`Erro ao alterar telefone: ${error.message}`);
      }
   }

   async delete(entity: PhoneModel): Promise<void> {
      try {
         await prisma.phone.delete({
            where: { id: entity.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir telefone: ${error.message}`);
      }
   }

   async read(): Promise<PhoneModel[]> {
      try {
         const phones = await prisma.phone.findMany({
            orderBy: { id: "asc" },
         });

         return phones.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar telefones: ${error.message}`);
      }
   }

   async get(entity: PhoneModel): Promise<PhoneModel> {
      try {
         const phone = await prisma.phone.findUnique({
            where: { id: entity.Id },
         });

         if (!phone) {
            throw new Error("Telefone não encontrado");
         }

         return this.mapToDomain(phone);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar telefone: ${error.message}`);
      }
   }

   async getByCustomer(entity: PhoneModel): Promise<PhoneModel> {
      try {
         const phone = await prisma.phone.findUnique({
            where: { customerId: entity.CustomerId },
         });

         if (!phone) {
            throw new Error("Telefone não encontrado");
         }

         return this.mapToDomain(phone);
      } catch (error: any) {
         throw new Error(
            `Erro ao consultar cidades por estado: ${error.message}`
         );
      }
   }

   private saveData(entity: PhoneModel): Prisma.PhoneCreateInput {
      return {
         ddd: entity.Ddd,
         number: entity.Number,
         phoneType: entity.PhoneType.toString(),
         customer: { connect: { id: entity.CustomerId } },
      };
   }

   private updateData(entity: PhoneModel): Prisma.PhoneUpdateInput {
      return {
         ddd: entity.Ddd,
         number: entity.Number,
         phoneType: entity.PhoneType.toString(),
      };
   }

   private mapToDomain(phone: PrismaPhone): PhoneModel {
      if (!phone) {
         throw new Error("Telefone invalido para mapeamento.");
      }

      const returnPhone = new PhoneModel();

      returnPhone.Id = phone.id;
      returnPhone.CustomerId = phone.customerId;
      returnPhone.Ddd = phone.ddd;
      returnPhone.Number = phone.number;
      returnPhone.PhoneType =
         PhoneType[phone.phoneType as keyof typeof PhoneType];

      return returnPhone;
   }
}
