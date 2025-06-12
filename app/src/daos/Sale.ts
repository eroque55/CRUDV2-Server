import IDAO from "./IDAO";
import { DomainEntityModel, SaleModel } from "../models";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";

interface CategorySalesData {
   month: string;
   [categoryName: string]: string | number;
}

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

   async getByCategory(from: Date, to: Date): Promise<CategorySalesData[]> {
      // Buscar TODAS as categorias do sistema
      const allCategoriesFromDB = await prisma.category.findMany({
         select: {
            name: true,
         },
      });

      const sales = await prisma.sale.findMany({
         where: {
            createdAt: {
               gte: from,
               lte: to,
            },
         },
         include: {
            cart: {
               include: {
                  bookToCart: {
                     include: {
                        book: {
                           include: {
                              bookToCategory: {
                                 include: {
                                    category: {
                                       omit: { id: true, slug: true },
                                    },
                                 },
                                 omit: { bookId: true, categoryId: true },
                              },
                           },
                           omit: {
                              author: true,
                              barcode: true,
                              edition: true,
                              id: true,
                              inativationReason: true,
                              isbn: true,
                              numberPages: true,
                              priceGroupId: true,
                              publisher: true,
                              reasonCategoryId: true,
                              slug: true,
                              status: true,
                              synopsis: true,
                              title: true,
                              year: true,
                           },
                        },
                     },
                     omit: {
                        bookId: true,
                        cartId: true,
                        status: true,
                        updatedAt: true,
                     },
                  },
               },
               omit: { customerId: true, id: true, status: true },
            },
         },
         omit: {
            cartId: true,
            couponId: true,
            id: true,
            paymentMethod: true,
            status: true,
            totalValue: true,
         },
      });

      // Obter todas as categorias do sistema
      const allCategories = allCategoriesFromDB.map((cat) => cat.name);

      // Gerar todos os meses no período
      const allMonths = this.generateMonthsBetweenDates(from, to);

      // Estrutura para armazenar os dados agregados
      const salesByMonthAndCategory: {
         [key: string]: { [category: string]: number };
      } = {};

      // Inicializar todos os meses com todas as categorias = 0
      allMonths.forEach((monthKey: any) => {
         salesByMonthAndCategory[monthKey] = {};
         allCategories.forEach((category) => {
            salesByMonthAndCategory[monthKey][category] = 0;
         });
      });

      // Processar as vendas
      sales.forEach((sale) => {
         const saleDate = new Date(sale.createdAt);
         const monthKey = `${saleDate.getFullYear()}-${String(
            saleDate.getMonth() + 1
         ).padStart(2, "0")}`;

         // Processar cada item do carrinho
         sale.cart.bookToCart.forEach((cartItem) => {
            const quantity = cartItem.amount || 1;

            // Processar cada categoria do livro
            cartItem.book.bookToCategory.forEach((bookCategory) => {
               const categoryName = bookCategory.category.name;

               // Somar a quantidade vendida para esta categoria neste mês
               if (
                  salesByMonthAndCategory[monthKey] &&
                  salesByMonthAndCategory[monthKey].hasOwnProperty(categoryName)
               ) {
                  salesByMonthAndCategory[monthKey][categoryName] += quantity;
               }
            });
         });
      });

      // Converter para o formato esperado pelo Recharts
      const result: CategorySalesData[] = allMonths.map((month: any) => {
         const monthData: CategorySalesData = {
            month: this.formatMonth(month),
         };

         // Adicionar cada categoria com sua quantidade
         allCategories.forEach((category) => {
            monthData[category] = salesByMonthAndCategory[month][category];
         });

         return monthData;
      });

      return result;
   }

   // Função auxiliar para gerar todos os meses entre duas datas
   private generateMonthsBetweenDates(
      startDate: Date,
      endDate: Date
   ): string[] {
      const months: string[] = [];
      const current = new Date(
         startDate.getFullYear(),
         startDate.getMonth(),
         1
      );
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

      while (current <= end) {
         const monthKey = `${current.getFullYear()}-${String(
            current.getMonth() + 1
         ).padStart(2, "0")}`;
         months.push(monthKey);
         current.setMonth(current.getMonth() + 1);
      }

      return months;
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

   private formatMonth(monthKey: string): string {
      const [year, month] = monthKey.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);

      const fomartedDate = date
         .toLocaleDateString("pt-BR", {
            month: "short",
            year: "numeric",
         })
         .replace(".", "");

      return fomartedDate.charAt(0).toUpperCase() + fomartedDate.slice(1);
   }
}

export default SaleDao;
