import IDAO from "./IDAO";
import { DomainEntityModel, SaleModel } from "../models";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";

class SaleDao implements IDAO {
   async create(entity: SaleModel): Promise<DomainEntityModel> {
      try {
         const sale = await prisma.sale.create({
            data: this.saveData(entity),
         });

         const cart = await prisma.cart.findUnique({
            where: { id: entity.cart?.id },
         });

         await prisma.cart.update({
            where: { id: entity.cart?.id },
            data: { status: false },
         });

         await prisma.cart.create({
            data: {
               status: true,
               customer: { connect: { id: cart?.customerId } },
            },
         });

         return this.mapToDomain(sale);
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
   async read(entity: SaleModel): Promise<DomainEntityModel[]> {
      try {
         if (entity.cart?.customer?.id) {
            const sales = await prisma.sale.findMany({
               where: { cart: { customerId: entity.cart?.customer?.id } },
               include: { freight: { include: { address: true } } },
               orderBy: { id: "desc" },
            });

            return sales.map(this.mapToDomain);
         }

         const sales = await prisma.sale.findMany({
            include: { cart: { include: { customer: true } } },
            orderBy: { id: "desc" },
         });

         return sales.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
   async update(entity: SaleModel): Promise<DomainEntityModel> {
      try {
         if (entity.status) {
            const sale = await prisma.sale.update({
               where: { id: entity.id },
               data: { status: entity.status },
            });

            return this.mapToDomain(sale);
         }
         throw new Error("Status não encontrado");
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
   delete(entity: DomainEntityModel): Promise<void> {
      throw new Error("TODO");
   }
   get(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }

   private saveData(entity: SaleModel): Prisma.SaleCreateInput {
      return {
         cart: { connect: { id: entity.cart?.id } },
         paymentMethod: entity.paymentMethod || "",
         totalValue: entity.totalValue || 0,
         freight: {
            create: {
               carrier: { connect: { id: entity.freight?.carrier?.id } },
               address: { connect: { id: entity.freight?.address?.id } },
               deliveryTime: 0,
            },
         },
         status: "EM_PROCESSAMENTO",
      };
   }

   private mapToDomain(sale: any): SaleModel {
      if (!sale) {
         throw new Error("Venda inválida para mapeamento");
      }

      return { ...sale };
   }
}

export default SaleDao;
