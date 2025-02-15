import { Prisma, PrismaClient, State as PrismaState } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import IDAO from "./IDAO";

import StateModel from "../models/State";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class State implements IDAO {
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
            orderBy: { id: "asc" },
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
         });

         if (!state) {
            throw new Error("Estado não encontrado");
         }

         return this.mapToDomain(state);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar estado: ${error.message}`);
      }
   }

   async getByContry(entity: StateModel): Promise<StateModel[]> {
      try {
         const states = await prisma.state.findMany({
            orderBy: { id: "asc" },
            where: { countryId: entity.Country.Id },
         });

         return states.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(
            `Erro ao consultar estados por pais: ${error.message}`
         );
      }
   }

   private saveData(entity: StateModel): Prisma.StateCreateInput {
      return {
         name: entity.Name,
         country: { connect: { id: entity.Country.Id } },
      };
   }

   private mapToDomain(state: PrismaState): StateModel {
      if (!state) {
         throw new Error("Estado inválido para mapeamento");
      }

      const returnState = new StateModel();

      returnState.Id = state.id;
      returnState.Name = state.name;
      returnState.Country.Id = state.countryId;

      return returnState;
   }
}
