import { Prisma, PrismaClient, CardBrand } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import IDAO from "./IDAO";

import CardModel from "../models/Card";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class CardDao implements IDAO {
   async create(entity: CardModel): Promise<CardModel> {
      try {
         const card = await prisma.card.create({
            data: this.saveData(entity),
         });

         return this.mapToDomain(card);
      } catch (error: any) {
         throw new Error(`Erro ao salvar cartão: ${error.message}`);
      }
   }

   async update(entity: CardModel): Promise<CardModel> {
      try {
         const card = await prisma.card.update({
            where: { id: entity.Id },
            data: { preferential: true },
         });

         await prisma.card.updateMany({
            where: { id: { not: entity.Id }, customerId: card.customerId },
            data: { preferential: false },
         });

         return this.mapToDomain(card);
      } catch (error: any) {
         throw new Error(`Erro ao alterar cartão: ${error.message}`);
      }
   }

   async delete(entity: CardModel): Promise<void> {
      try {
         await prisma.card.delete({
            where: { id: entity.Id },
         });
      } catch (error: any) {
         throw new Error(`Erro ao excluir cartão: ${error.message}`);
      }
   }

   async read(): Promise<CardModel[]> {
      try {
         const cards = await prisma.card.findMany({
            orderBy: { id: "asc" },
         });
         return cards.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar cartões: ${error.message}`);
      }
   }

   async get(entity: CardModel): Promise<CardModel> {
      try {
         const card = await prisma.card.findUnique({
            where: { id: entity.Id },
         });

         if (!card) {
            throw new Error("Cartão não encontrado");
         }

         return this.mapToDomain(card);
      } catch (error: any) {
         throw new Error(`Erro ao selecionar cartão: ${error.message}`);
      }
   }

   private maskCardNumber(number: string): string {
      const length = number.length;
      const lastFourDigits = number.substring(length - 4, length);
      const maskedCard = "****.****.****." + lastFourDigits;
      return maskedCard;
   }

   private maskCvv(cvv: string): string {
      const length = cvv.length;
      const maskedCvv = "*".repeat(length);
      return maskedCvv;
   }

   private saveData(entity: CardModel): Prisma.CardCreateInput {
      return {
         customer: { connect: { id: entity.Customer?.["id"] } },
         number: this.maskCardNumber(entity.Number || ""),
         cardholder: entity.Cardholder || "",
         cvv: this.maskCvv(entity.Cvv || ""),
         expirationDate: entity.ExpirationDate || "",
         preferential: entity.Preferential,
         cardBrand: entity.CardBrand || CardBrand.VISA,
      };
      5;
   }

   private updateData(entity: CardModel): Prisma.CardUpdateInput {
      return {
         preferential: entity.Preferential,
      };
   }

   private mapToDomain(card: any): CardModel {
      if (!card) {
         throw new Error("Cartão inválido para mapeamento.");
      }

      return { ...card };
   }
}
