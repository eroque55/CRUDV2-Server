import { Prisma } from "@prisma/client";
import IDAO from "./IDAO";
import prisma from "./prisma";
import StateModel from "../models/State";

class StateDao implements IDAO {
   async create(entity: StateModel): Promise<StateModel> {
      try {
         const state = await prisma.state.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(state);
      } catch (error: any) {
         throw new Error(`Erro ao salvar estado: ${error.message}`);
      }
   }

   async update(entity: StateModel): Promise<StateModel> {
      try {
         const state = await prisma.state.update({
            where: { id: entity.Id },
            data: this.saveData(entity),
         });

         return this.mapToDomain(state);
      } catch (error: any) {
         throw new Error(`Erro ao alterar estado: ${error.message}`);
      }
   }

   async delete(entity: StateModel): Promise<void> {
      try {
         await prisma.state.delete({
            where: { id: entity.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir estado: ${error.message}`);
      }
   }

   async read(): Promise<StateModel[]> {
      try {
         const states = await prisma.state.findMany({
            orderBy: { name: "asc" },
            include: { cities: true },
         });

         return states.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar estados: ${error.message}`);
      }
   }

   async get(entity: StateModel): Promise<StateModel> {
      try {
         const state = await prisma.state.findUnique({
            where: { id: entity.Id },
            include: { cities: true },
         });

         if (!state) {
            throw new Error("Estado não encontrado");
         }

         return this.mapToDomain(state);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar estado: ${error.message}`);
      }
   }

   private saveData(entity: StateModel): Prisma.StateCreateInput {
      return {
         name: entity.Name || "",
         country: { connect: { id: entity.Country?.Id } },
      };
   }

   private mapToDomain(state: any): StateModel {
      if (!state) {
         throw new Error("Estado inválido para mapeamento");
      }
      3;
      return { ...state };
   }
}

export default StateDao;
