import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Card from "../models/Card";

export default class ValidateCard implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Card) {
         const card = entity as Card;

         if (card.id === 0) {
            if (!card.customer?.id) {
               message += "Cliente é obrigatório. ";
            }

            if (!card.number) {
               message += "Número do cartão é obrigatório. ";
            }

            if (!card.cardholder) {
               message += "Nome impresso no cartão é obrigatório. ";
            }

            if (!card.cvv) {
               message += "Código de segurança é obrigatório. ";
            } else if (card.cvv.length !== 3) {
               message += "Código de segurança deve ter 3 dígitos. ";
            }

            if (!card.expirationDate) {
               message += "Data de validade é obrigatória. ";
            }

            if (!card.cardBrand) {
               message += "Bandeira do cartão é obrigatória. ";
            }
         }
      }

      return message;
   }
}
