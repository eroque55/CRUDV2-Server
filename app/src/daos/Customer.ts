import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import IDAO from "./IDAO";
import encryptPassword from "../utils/passwordEncryptor";
import CustomerModel from "../models/Customer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class CustomerDao implements IDAO {
   async create(entity: CustomerModel): Promise<CustomerModel> {
      try {
         const customer = await prisma.customer.create({
            data: this.saveData(entity),
            omit: { password: true },
         });

         return this.mapToDomain(customer);
      } catch (error: any) {
         if (error instanceof PrismaClientKnownRequestError) {
            throw new Error(
               `Já existe um cliente com esse ${error?.meta?.target}`
            );
         }
         throw new Error(`Erro ao salvar cliente`);
      }
   }

   async update(entity: CustomerModel): Promise<CustomerModel> {
      try {
         if (entity.Password || entity.ConfPassword) {
            const confPassword = encryptPassword(entity.ConfPassword || "");
            const dbCustomer = await prisma.customer.findUnique({
               where: { id: entity.Id },
            });
            if (confPassword !== dbCustomer?.password) {
               throw new Error("Senha incorreta");
            }
         }
         const customer = await prisma.customer.update({
            where: { id: entity.Id },
            data: this.updateData(entity),
            omit: { password: true },
         });

         return this.mapToDomain(customer);
      } catch (error: any) {
         if (error instanceof PrismaClientKnownRequestError) {
            throw new Error(
               `Já existe um cliente com esse ${error?.meta?.target}`
            );
         }
         throw new Error(`${error.message}`);
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

   async read(entity: CustomerModel): Promise<CustomerModel[]> {
      try {
         const customers = await prisma.customer.findMany({
            orderBy: { id: "asc" },
            where: {
               name: { contains: entity.Name },
               status: entity.Status,
               ranking: entity.Ranking,
               cpf: { contains: entity.Cpf },
               email: { contains: entity.Email },
               birthDate: { equals: entity.BirthDate },
               gender: entity.Gender,
            },
            omit: { password: true },
         });
         return customers.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar clientes: ${error.message}`);
      }
   }

   async get(entity: CustomerModel): Promise<CustomerModel> {
      try {
         if (entity.Email || entity.Password) {
            const password = encryptPassword(entity.Password || "");
            const dbCustomer = await prisma.customer.findUnique({
               where: { email: entity.Email },
            });
            if (!dbCustomer) {
               throw new Error("E-mail não encontrado");
            } else if (password !== dbCustomer?.password) {
               throw new Error("Senha incorreta");
            } else {
               entity.Id = dbCustomer.id;
            }
         }
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
               phone: true,
               cards: true,
            },
            omit: { password: true },
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
         name: entity.Name || "",
         birthDate: entity.BirthDate || new Date(),
         cpf: entity.Cpf || "",
         email: entity.Email || "",
         password: encryptPassword(entity.Password || ""),
         status: entity.Status || false,
         gender: entity.Gender || "OUTRO",
         ranking: entity.Ranking || 0,
         phone: {
            create: {
               ddd: entity?.Phone?.Ddd || "",
               number: entity?.Phone?.Number || "",
               phoneType: entity?.Phone?.PhoneType || "CELULAR",
            },
         },
         addresses: {
            create: [
               {
                  addressType: "COBRANCA",
                  neighborhood: entity?.Addresses?.[0].Neighborhood || "",
                  number: entity?.Addresses?.[0].Number || 0,
                  street: entity?.Addresses?.[0].Street || "",
                  complement: entity?.Addresses?.[0].Complement || "",
                  cep: entity?.Addresses?.[0].Cep || "",
                  cityId: entity?.Addresses?.[0].City?.Id || 0,
                  nickname: entity?.Addresses?.[0].Nickname || "",
                  residenceType:
                     entity?.Addresses?.[0].ResidenceType || "OUTRO",
                  streetType: entity?.Addresses?.[0].StreetType || "OUTRO",
               },
               {
                  addressType: "ENTREGA",
                  neighborhood: entity?.Addresses?.[1].Neighborhood || "",
                  number: entity?.Addresses?.[1].Number || 0,
                  street: entity?.Addresses?.[1].Street || "",
                  complement: entity?.Addresses?.[1].Complement || "",
                  cep: entity?.Addresses?.[1].Cep || "",
                  cityId: entity?.Addresses?.[1].City?.Id || 0,
                  nickname: entity?.Addresses?.[1].Nickname || "",
                  residenceType:
                     entity?.Addresses?.[1].ResidenceType || "OUTRO",
                  streetType: entity?.Addresses?.[1].StreetType || "OUTRO",
               },
            ],
         },
      };
   }

   private updateData(entity: CustomerModel): Prisma.CustomerUpdateInput {
      const password = entity.Password
         ? encryptPassword(entity.Password)
         : undefined;
      return {
         name: entity.Name,
         birthDate: entity.BirthDate,
         cpf: entity.Cpf,
         gender: entity.Gender,
         email: entity.Email,
         ranking: entity.Ranking,
         status: entity.Status,
         password: password,
      };
   }

   private mapToDomain(customer: any): CustomerModel {
      if (!customer) {
         throw new Error("Cliente inválido para mapeamento.");
      }

      return { ...customer };
   }
}

export default CustomerDao;
