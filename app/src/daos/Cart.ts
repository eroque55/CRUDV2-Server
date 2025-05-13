import prisma from "./prisma";
import IDAO from "./IDAO";
import { DomainEntityModel, CartModel } from "../models";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class CartDao implements IDAO {
   async create(entity: CartModel): Promise<DomainEntityModel> {
      try {
         const cart = await prisma.cart.findFirst({
            where: { customerId: entity.customer?.id, status: true },
         });

         if (!cart) {
            throw new Error("Carrinho não encontrado");
         }

         const book = await prisma.book.findUnique({
            where: { id: entity?.bookToCart?.[0].book?.id },
         });

         if (!book) {
            throw new Error("Livro não encontrado");
         }

         const updatedCart = await prisma.cart.update({
            where: { id: cart.id },
            data: {
               bookToCart: {
                  create: {
                     amount: 1,
                     status: true,
                     book: {
                        connect: { id: book.id },
                     },
                     updatedAt: new Date(),
                  },
               },
            },
         });

         return this.mapToDomain(updatedCart);
      } catch (error: any) {
         if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
               throw new Error("Livro já adicionado ao carrinho");
            }
         }
         throw new Error(
            `Erro ao adicionar produto no carrinho: ${error.message}`
         );
      }
   }

   read(entity: DomainEntityModel): Promise<DomainEntityModel[]> {
      throw new Error("TODO");
   }

   async update(entity: CartModel): Promise<DomainEntityModel> {
      try {
         if (!entity.bookToCart || !Array.isArray(entity.bookToCart)) {
            throw new Error("Lista de bookToCart inválida");
         }

         const updateOrDeletePromises = entity.bookToCart.map(
            async (item: any) => {
               const { cartId, bookId, amount } = item;

               // Verifica se o item existe antes de qualquer ação
               const existing = await prisma.bookToCart.findUnique({
                  where: {
                     cartId_bookId: {
                        cartId: entity.id || 0,
                        bookId: item.book.id,
                     },
                  },
               });

               if (!existing) {
                  throw new Error(
                     `Item não encontrado: cartId=${cartId}, bookId=${bookId}`
                  );
               }

               if (amount <= 0) {
                  // Remove item do carrinho
                  return await prisma.bookToCart.delete({
                     where: {
                        cartId_bookId: {
                           cartId: entity.id || 0,
                           bookId: item.book.id,
                        },
                     },
                  });
               } else {
                  // Atualiza a quantidade
                  return await prisma.bookToCart.update({
                     where: {
                        cartId_bookId: {
                           cartId: entity.id || 0,
                           bookId: item.book.id,
                        },
                     },
                     data: {
                        amount,
                     },
                  });
               }
            }
         );

         await Promise.all(updateOrDeletePromises);

         return await this.get(entity); // Retorna carrinho atualizado
      } catch (error: any) {
         throw new Error(`Erro ao atualizar carrinho: ${error.message}`);
      }
   }

   delete(entity: DomainEntityModel): Promise<void> {
      throw new Error("TODO");
   }

   async get(entity: CartModel): Promise<DomainEntityModel> {
      try {
         const cart = await prisma.cart.findFirst({
            where: { customerId: entity.customer?.id, status: true },
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
      if (!cart) throw new Error("Carrinho inválido para mapeamento");
      return { ...cart };
   }
}

export default CartDao;
