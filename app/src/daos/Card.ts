import { Prisma, PrismaClient, Card as PrismaCard } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import IDAO from "./IDAO";

import CardModel from "../models/Card";
import CardBrand from "../enums/CardBrand";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class Card implements IDAO {
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
            data: this.updateData(entity),
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
         customer: { connect: { id: entity.CustomerId } },
         number: this.maskCardNumber(entity.Number),
         cardholder: entity.CardHolder,
         cvv: this.maskCvv(entity.Cvv),
         expirationDate: entity.ExpirationDate,
         preferential: entity.Preferential,
         cardBrand: entity.CardBrand.toString(),
      };
   }

   private updateData(entity: CardModel): Prisma.CardUpdateInput {
      return {
         preferential: entity.Preferential,
      };
   }

   private mapToDomain(card: PrismaCard): CardModel {
      if (!card) {
         throw new Error("Cartão inválido para mapeamento.");
      }

      const returnCard = new CardModel();

      returnCard.Id = card.id;
      returnCard.CustomerId = card.customerId;
      returnCard.Number = card.number;
      returnCard.CardHolder = card.cardholder;
      returnCard.Cvv = card.cvv;
      returnCard.ExpirationDate = card.expirationDate;
      returnCard.Preferential = card.preferential;
      returnCard.CardBrand =
         CardBrand[card.cardBrand as keyof typeof CardBrand];

      return returnCard;
   }
}
