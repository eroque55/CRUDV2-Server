import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import IDAO from "./IDAO";
import CountryModel from "../models/Country";

class CountryDao implements IDAO {
   async create(entity: CountryModel): Promise<CountryModel> {
      try {
         const country = await prisma.country.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(country);
      } catch (error: any) {
         throw new Error(`Erro ao salvar pais: ${error.message}`);
      }
   }

   async update(entity: CountryModel): Promise<CountryModel> {
      try {
         const country = await prisma.country.update({
            where: { id: entity.Id },
            data: this.saveData(entity),
         });

         return this.mapToDomain(country);
      } catch (error: any) {
         throw new Error(`Erro ao alterar pais: ${error.message}`);
      }
   }

   async delete(entity: CountryModel): Promise<void> {
      try {
         await prisma.country.delete({
            where: { id: entity.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir pais: ${error.message}`);
      }
   }

   async read(): Promise<CountryModel[]> {
      try {
         const countries = await prisma.country.findMany({
            orderBy: { name: "asc" },
            include: {
               states: {
                  include: { cities: true },
               },
            },
         });

         return countries.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar paises: ${error.message}`);
      }
   }

   async get(entity: CountryModel): Promise<CountryModel> {
      try {
         const country = await prisma.country.findUnique({
            where: { id: entity.Id },
            include: {
               states: {
                  include: { cities: true },
               },
            },
         });

         if (!country) {
            throw new Error("Pais não encontrado");
         }

         return this.mapToDomain(country);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar pais: ${error.message}`);
      }
   }

   private saveData(entity: CountryModel): Prisma.CountryCreateInput {
      return {
         name: entity.Name || "",
      };
   }

   private mapToDomain(country: any): CountryModel {
      if (!country) {
         throw new Error("Pais inválido para mapeamento");
      }

      return { ...country };
   }
}

export default CountryDao;
