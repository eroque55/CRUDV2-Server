import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import IDAO from "./IDAO";
import CityModel from "../models/City";

class CityDao implements IDAO {
   async create(entity: CityModel): Promise<CityModel> {
      try {
         const city = await prisma.city.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(city);
      } catch (error: any) {
         throw new Error(`Erro ao salvar cidade: ${error.message}`);
      }
   }

   async update(entity: CityModel): Promise<CityModel> {
      try {
         const city = await prisma.city.update({
            where: { id: entity.id },
            data: this.saveData(entity),
         });
         return this.mapToDomain(city);
      } catch (error: any) {
         throw new Error(`Erro ao alterar cidade: ${error.message}`);
      }
   }

   async delete(entity: CityModel): Promise<void> {
      try {
         await prisma.city.delete({
            where: { id: entity.id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir cidade: ${error.message}`);
      }
   }

   async read(): Promise<CityModel[]> {
      try {
         const cities = await prisma.city.findMany({
            orderBy: { id: "asc" },
            include: {
               state: {
                  include: {
                     country: true,
                  },
               },
            },
         });
         return cities.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar cidades: ${error.message}`);
      }
   }

   async get(entity: CityModel): Promise<CityModel> {
      try {
         const city = await prisma.city.findUnique({
            where: { id: entity.id },
            include: {
               state: {
                  include: {
                     country: true,
                  },
               },
            },
         });

         if (!city) {
            throw new Error("Cidade não encontrada");
         }

         return this.mapToDomain(city);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cidade: ${error.message}`);
      }
   }

   private saveData(entity: CityModel): Prisma.CityCreateInput {
      return {
         name: entity.name || "",
         state: { connect: { id: entity?.state?.id } },
      };
   }

   private mapToDomain(city: any): CityModel {
      if (!city) {
         throw new Error("Cidade inválida para mapeamento.");
      }

      return { ...city };
   }
}

export default CityDao;
