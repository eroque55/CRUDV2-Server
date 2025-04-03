import IDAO from "./IDAO";
import { CategoryModel } from "../models";
import prisma from "./prisma";

class CategoryDao implements IDAO {
   create(entity: CategoryModel): Promise<CategoryModel> {
      throw new Error("TODO");
   }

   async read(entity: CategoryModel): Promise<CategoryModel[]> {
      try {
         const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
         });
         return categories.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar categorias: ${error.message}`);
      }
   }

   update(entity: CategoryModel): Promise<CategoryModel> {
      throw new Error("TODO");
   }
   delete(entity: CategoryModel): Promise<void> {
      throw new Error("TODO");
   }
   get(entity: CategoryModel): Promise<CategoryModel> {
      throw new Error("TODO");
   }

   private mapToDomain(category: any): CategoryModel {
      if (!category) throw new Error(`Categoria inválida para mapeamento`);
      return { ...category };
   }
}

export default CategoryDao;
