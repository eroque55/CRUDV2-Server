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
            where: { id: entity.Cart?.Id },
         });

         await prisma.cart.update({
            where: { id: entity.Cart?.Id },
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
         console.log(error);
         throw new Error(error.message);
      }
   }
   async read(entity: SaleModel): Promise<DomainEntityModel[]> {
      try {
         const sales = await prisma.sale.findMany({
            orderBy: { id: "asc" },
         });

         return sales.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
   update(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   delete(entity: DomainEntityModel): Promise<void> {
      throw new Error("TODO");
   }
   get(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }

   private saveData(entity: SaleModel): Prisma.SaleCreateInput {
      return {
         cart: { connect: { id: entity.Cart?.Id } },
         paymentMethod: entity.PaymentMethod || "",
         totalValue: entity.TotalValue || 0,
         freight: {
            create: {
               carrier: { connect: { id: entity.Freight?.Carrier?.Id } },
               address: { connect: { id: entity.Freight?.Address?.Id } },
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
