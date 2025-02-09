import { Prisma, PrismaClient, Country as PrismaCountry } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import IDAO from "./IDAO";

import CountryModel from "../models/Country";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class Country implements IDAO {
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
         name: entity.Name,
      };
   }

   private mapToDomain(country: PrismaCountry): CountryModel {
      if (!country) {
         throw new Error("Pais inválido para mapeamento");
      }

      const returnCountry = new CountryModel();

      returnCountry.Id = country.id;
      returnCountry.Name = country.name;

      return returnCountry;
   }
}
