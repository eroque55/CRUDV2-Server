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

         await prisma.cart.create({
            data: {
               customerId: customer.id,
            },
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
         if (entity.password || entity.confPassword) {
            const confPassword = encryptPassword(entity.confPassword || "");
            const dbCustomer = await prisma.customer.findUnique({
               where: { id: entity.id },
            });
            if (confPassword !== dbCustomer?.password) {
               throw new Error("Senha incorreta");
            }
         }
         const customer = await prisma.customer.update({
            where: { id: entity.id },
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
            where: { id: entity.id },
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
               name: { contains: entity.name },
               status: entity.status,
               ranking: entity.ranking,
               cpf: { contains: entity.cpf },
               email: { contains: entity.email },
               birthDate: { equals: entity.birthDate },
               gender: entity.gender,
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
         if (entity.email || entity.password) {
            const password = encryptPassword(entity.password || "");
            const dbCustomer = await prisma.customer.findUnique({
               where: { email: entity.email },
            });
            if (!dbCustomer) {
               throw new Error("E-mail não encontrado");
            } else if (password !== dbCustomer?.password) {
               throw new Error("Senha incorreta");
            } else {
               entity.id = dbCustomer.id;
            }
         }
         const customer = await prisma.customer.findUnique({
            where: { id: entity.id },
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
         name: entity.name || "",
         birthDate: entity.birthDate || new Date(),
         cpf: entity.cpf || "",
         email: entity.email || "",
         password: encryptPassword(entity.password || ""),
         status: entity.status || false,
         gender: entity.gender || "OUTRO",
         ranking: entity.ranking || 0,
         phone: {
            create: {
               ddd: entity?.phone?.ddd || "",
               number: entity?.phone?.number || "",
               phoneType: entity?.phone?.phoneType || "CELULAR",
            },
         },
         addresses: {
            create: [
               {
                  addressType: "COBRANCA",
                  neighborhood: entity?.addresses?.[0].neighborhood || "",
                  number: entity?.addresses?.[0].number || 0,
                  street: entity?.addresses?.[0].street || "",
                  complement: entity?.addresses?.[0].complement || "",
                  cep: entity?.addresses?.[0].cep || "",
                  cityId: entity?.addresses?.[0].city?.id || 0,
                  nickname: entity?.addresses?.[0].nickname || "",
                  residenceType:
                     entity?.addresses?.[0].residenceType || "OUTRO",
                  streetType: entity?.addresses?.[0].streetType || "OUTRO",
               },
               {
                  addressType: "ENTREGA",
                  neighborhood: entity?.addresses?.[1].neighborhood || "",
                  number: entity?.addresses?.[1].number || 0,
                  street: entity?.addresses?.[1].street || "",
                  complement: entity?.addresses?.[1].complement || "",
                  cep: entity?.addresses?.[1].cep || "",
                  cityId: entity?.addresses?.[1].city?.id || 0,
                  nickname: entity?.addresses?.[1].nickname || "",
                  residenceType:
                     entity?.addresses?.[1].residenceType || "OUTRO",
                  streetType: entity?.addresses?.[1].streetType || "OUTRO",
               },
            ],
         },
      };
   }

   private updateData(entity: CustomerModel): Prisma.CustomerUpdateInput {
      const password = entity.password
         ? encryptPassword(entity.password)
         : undefined;
      return {
         name: entity.name,
         birthDate: entity.birthDate,
         cpf: entity.cpf,
         gender: entity.gender,
         email: entity.email,
         ranking: entity.ranking,
         status: entity.status,
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
