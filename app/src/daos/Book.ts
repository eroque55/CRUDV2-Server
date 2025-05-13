import prisma from "./prisma";
import IDAO from "./IDAO";
import { BookModel } from "../models";
import { Prisma } from "@prisma/client";

class BookDao implements IDAO {
   async create(entity: BookModel): Promise<BookModel> {
      try {
         const customer = await prisma.book.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(customer);
      } catch (error: any) {
         throw new Error(`Erro ao salvar livro: ${error.message}`);
      }
   }

   async update(entity: BookModel): Promise<BookModel> {
      throw new Error(`TODO`);
   }

   async delete(entity: BookModel): Promise<void> {
      throw new Error(`TODO`);
   }

   async read(entity: BookModel): Promise<BookModel[]> {
      try {
         const categorySlug = entity.bookToCategory[0]?.category?.slug;

         const books = await prisma.book.findMany({
            orderBy: { title: "asc" },
            where: {
               title: { contains: entity.title },
               ...(categorySlug
                  ? {
                       bookToCategory: {
                          some: { category: { slug: categorySlug } },
                       },
                    }
                  : {}),
            },

            include: {
               priceGroup: true,
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
                  },
               },
            },
            omit: {
               barcode: true,
               edition: true,
               inativationReason: true,
               numberPages: true,
               isbn: true,
               publisher: true,
               reasonCategoryId: true,
               synopsis: true,
               year: true,
            },
         });

         return books.map(this.mapToDomain);
      } catch (error: any) {
         console.log(error);
         throw new Error(`Erro ao consultar livros: ${error.message}`);
      }
   }

   async get(entity: BookModel): Promise<BookModel> {
      try {
         const book = await prisma.book.findUnique({
            where: { slug: entity.slug },
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

   private mapToDomain(book: any): BookModel {
      if (!book) throw new Error(`Livro inválido para mapeamento`);

      const bookModel = new BookModel(book);

      const calculatedBook = {
         ...book,
         value: bookModel.Value,
      };

      return calculatedBook;
   }

   private saveData(entity: BookModel): Prisma.BookCreateInput {
      return {
         title: entity.title || "",
         slug: entity.slug || "",
         author: entity.author || "",
         year: entity.year || 0,
         synopsis: entity.synopsis || "",
         numberPages: entity.numberPages || 0,
         publisher: entity.publisher || "",
         edition: entity.edition || 0,
         isbn: entity.isbn || "",
         barcode: entity.barcode || "",
         priceGroup: { connect: { id: entity.priceGroup?.id || 0 } },
         bookDimension: {
            create: {
               height: entity.bookDimension?.height || 0,
               width: entity.bookDimension?.width || 0,
               thickness: entity.bookDimension?.thickness || 0,
               weight: entity.bookDimension?.weight || 0,
            },
         },
         stock: {
            create: {
               amount: entity.stock?.amount || 0,
               stockMovement: {
                  create: {
                     amount: entity.stock?.stockMovement[0]?.amount || 0,
                     cost: entity.stock?.stockMovement[0]?.cost || 0,
                     supplier: entity.stock?.stockMovement[0]?.supplier || "",
                     movementType:
                        entity.stock?.stockMovement[0]?.movementType ||
                        "ENTRADA",
                  },
               },
            },
         },
         bookToCategory: {
            create: {
               category: {
                  connect: {
                     id: entity.bookToCategory[0]?.category?.id || 0,
                  },
               },
            },
         },
      };
   }
}

export default BookDao;
