import { Prisma, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import IDAO from "./IDAO";

import CityModel from "../models/City";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class CityDao implements IDAO {
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
            where: { id: entity.Id },
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
            where: { id: entity.Id },
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
            where: { id: entity.Id },
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
         name: entity.Name,
         state: { connect: { id: entity.State.Id } },
      };
   }

   private mapToDomain(city: any): CityModel {
      if (!city) {
         throw new Error("Cidade inválida para mapeamento.");
      }

      return { ...city };
   }
}
