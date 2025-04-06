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
         const categorySlug = entity.BookToCategory?.[0]?.Category?.Slug;

         const books = await prisma.book.findMany({
            orderBy: { title: "asc" },
            where: categorySlug
               ? {
                    bookToCategory: {
                       some: { category: { slug: categorySlug } },
                    },
                 }
               : {},
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
            where: { slug: entity.Slug },
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

   private saveData(entity: BookModel): Prisma.BookCreateInput {
      return {
         title: entity.Title || "",
         slug: entity.Slug || "",
         author: entity.Author || "",
         year: entity.Year || 0,
         synopsis: entity.Synopsis || "",
         numberPages: entity.NumberPages || 0,
         publisher: entity.Publisher || "",
         edition: entity.Edition || 0,
         isbn: entity.Isbn || "",
         barcode: entity.Barcode || "",
         priceGroup: { connect: { id: entity.PriceGroup?.Id || 0 } },
         bookDimension: {
            create: {
               height: entity.BookDimension?.Height || 0,
               width: entity.BookDimension?.Width || 0,
               thickness: entity.BookDimension?.Thickness || 0,
               weight: entity.BookDimension?.Weight || 0,
            },
         },
         stock: {
            create: {
               amount: entity.Stock?.Amount || 0,
               stockMovement: {
                  create: {
                     amount: entity.Stock?.StockMovement[0]?.Amount || 0,
                     cost: entity.Stock?.StockMovement[0]?.Cost || 0,
                     supplier: entity.Stock?.StockMovement[0]?.Supplier || "",
                     movementType:
                        entity.Stock?.StockMovement[0]?.MovementType ||
                        "ENTRADA",
                  },
               },
            },
         },
         bookToCategory: {
            create: {
               category: {
                  connect: {
                     id: entity.BookToCategory[0]?.Category?.Id || 0,
                  },
               },
            },
         },
      };
   }
}

export default BookDao;
