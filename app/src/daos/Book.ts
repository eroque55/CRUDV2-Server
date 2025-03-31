import prisma from "./prisma";
import IDAO from "./IDAO";
import { BookModel } from "../models";

class BookDao implements IDAO {
   async create(entity: BookModel): Promise<BookModel> {
      throw new Error(`TODO`);
   }

   async update(entity: BookModel): Promise<BookModel> {
      throw new Error(`TODO`);
   }

   async delete(entity: BookModel): Promise<void> {
      throw new Error(`TODO`);
   }

   async read(entity: BookModel): Promise<BookModel[]> {
      try {
         const books = await prisma.book.findMany({
            orderBy: { title: "asc" },
            include: {
               stock: {
                  include: {
                     stockMovement: {
                        omit: {
                           amount: true,
                           createdAt: true,
                           stockId: true,
                           supplier: true,
                           id: true,
                           movementType: true,
                        },
                     },
                  },
                  omit: {
                     bookId: true,
                     id: true,
                     updatedAt: true,
                     amount: true,
                  },
               },
            },
            omit: {
               barcode: true,
               edition: true,
               inativationReason: true,
               numberPages: true,
               isbn: true,
               priceGroupId: true,
               publisher: true,
               reasonCategoryId: true,
               synopsis: true,
               year: true,
            },
         });

         return books.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar livros: ${error.message}`);
      }
   }

   async get(entity: BookModel): Promise<BookModel> {
      try {
         const book = await prisma.book.findUnique({
            where: { id: entity.Id },
            include: {
               bookDimension: true,
               priceGroup: true,
               bookToCategory: { include: { category: true } },
               stock: { include: { stockMovement: true } },
            },
         });

         return this.mapToDomain(book);
      } catch (error: any) {
         throw new Error(`Erro ao consultar livro: ${error.message}`);
      }
   }

   private mapToDomain(country: any): BookModel {
      if (!country) throw new Error(`Livro inválido para mapeamento`);
      return { ...country };
   }
}

export default BookDao;
