import {
   Prisma,
   PrismaClient,
   Customer as PrismaCustomer,
} from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import IDAO from "./IDAO";

import crypto from "crypto";

import CustomerModel from "../models/Customer";
import Gender from "../enums/Gender";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class Customer implements IDAO {
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
         });

         if (!customer) {
            throw new Error("Cliente não encontrado");
         }

         return this.mapToDomain(customer);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cliente: ${error.message}`);
      }
   }

   private encryptPassword(password: string): string {
      try {
         const hash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
         return hash;
      } catch (error) {
         return "";
      }
   }

   private saveData(entity: CustomerModel): Prisma.CustomerCreateInput {
      return {
         name: entity.Name,
         birthDate: entity.BirthDate,
         cpf: entity.Cpf,
         email: entity.Email,
         password: this.encryptPassword(entity.Password),
         status: entity.Status,
         gender: Gender[entity.Gender as keyof typeof Gender],
         ranking: entity.Ranking,
      };
   }

   private updateData(entity: CustomerModel): Prisma.CustomerUpdateInput {
      return {
         name: entity.Name,
         birthDate: entity.BirthDate,
         cpf: entity.Cpf,
         email: entity.Email,
         status: entity.Status,
         gender: Gender[entity.Gender as keyof typeof Gender],
         ranking: entity.Ranking,
      };
   }

   private mapToDomain(customer: PrismaCustomer): CustomerModel {
      if (!customer) {
         throw new Error("Cliente inválido para mapeamento.");
      }

      const returnCustomer = new CustomerModel();

      returnCustomer.Id = customer.id;
      returnCustomer.Name = customer.name;
      returnCustomer.BirthDate = customer.birthDate;
      returnCustomer.Cpf = customer.cpf;
      returnCustomer.Email = customer.email;
      returnCustomer.Status = customer.status;
      returnCustomer.Gender = Gender[customer.gender as keyof typeof Gender];
      returnCustomer.Ranking = customer.ranking;
      returnCustomer.Password = customer.password;
      returnCustomer.ConfPassword = customer.password;

      return returnCustomer;
   }
}
