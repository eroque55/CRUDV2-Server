import prisma from "./prisma";
import IDAO from "./IDAO";
import { DomainEntityModel, CouponModel } from "../models";

class CartDao implements IDAO {
   create(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   read(entity: DomainEntityModel): Promise<DomainEntityModel[]> {
      throw new Error("TODO");
   }
   update(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   delete(entity: DomainEntityModel): Promise<void> {
      throw new Error("TODO");
   }
   async get(entity: DomainEntityModel): Promise<DomainEntityModel> {
      try {
         const coupon = await prisma.cart.findUnique({
            where: { id: entity.id },
         });

         if (!coupon) throw new Error(`Cupom não encontrado`);

         return this.mapToDomain(coupon);
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   private mapToDomain(coupon: any): CouponModel {
      if (!coupon) throw new Error(`Cupom inválido para mapeamento`);
      return { ...coupon };
   }
}

export default CartDao;
