import { Prisma, PhoneType } from "@prisma/client";
import IDAO from "./IDAO";
import prisma from "./prisma";
import PhoneModel from "../models/Phone";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class PhoneDao implements IDAO {
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
         if (error instanceof PrismaClientKnownRequestError) {
            throw new Error(
               `Já existe um telefone com esse ${error?.meta?.target}`
            );
         }
         throw new Error(`${error.message}`);
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
         if (error instanceof PrismaClientKnownRequestError) {
            throw new Error(
               `Já existe um telefone com esse ${error?.meta?.target}`
            );
         }
         throw new Error(`${error.message}`);
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

   private saveData(entity: PhoneModel): Prisma.PhoneCreateInput {
      return {
         ddd: entity.Ddd || "",
         number: entity.Number || "",
         phoneType: entity.PhoneType || PhoneType.CELULAR,
         customer: { connect: { id: entity?.Customer?.Id } },
      };
   }

   private updateData(entity: PhoneModel): Prisma.PhoneUpdateInput {
      return {
         ddd: entity.Ddd,
         number: entity.Number,
         phoneType: entity.PhoneType,
      };
   }

   private mapToDomain(phone: any): PhoneModel {
      if (!phone) {
         throw new Error("Telefone invalido para mapeamento.");
      }

      return { ...phone };
   }
}

export default PhoneDao;
