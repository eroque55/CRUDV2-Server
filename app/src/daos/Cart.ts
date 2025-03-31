import prisma from "./prisma";
import IDAO from "./IDAO";
import { DomainEntityModel, CartModel } from "../models";

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
         const cart = await prisma.cart.findUnique({
            where: { id: entity.Id },
            include: {
               bookToCart: {
                  include: {
                     book: {
                        include: {
                           priceGroup: true,
                           stock: { include: { stockMovement: true } },
                        },
                     },
                  },
               },
            },
         });

         return this.mapToDomain(cart);
      } catch (error: any) {
         throw new Error(`Erro ao consultar carrinho: ${error.message}`);
      }
   }

   private mapToDomain(cart: any): CartModel {
      if (!cart) throw new Error(`Carrito inválido para mapeamento`);
      return { ...cart };
   }
}

export default CartDao;
