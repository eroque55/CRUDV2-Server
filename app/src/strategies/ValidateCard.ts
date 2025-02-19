import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Card from "../models/Card";

export default class ValidateCard implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Card) {
         const card = entity as Card;

         if (card.Id === 0) {
            if (!card.Customer?.Id) {
               message += "Cliente é obrigatório. ";
            }

            if (!card.Number) {
               message += "Número do cartão é obrigatório. ";
            }

            if (!card.Cardholder) {
               message += "Nome impresso no cartão é obrigatório. ";
            }

            if (!card.Cvv) {
               message += "Código de segurança é obrigatório. ";
            } else if (card.Cvv.length !== 3) {
               message += "Código de segurança deve ter 3 dígitos. ";
            }

            if (!card.ExpirationDate) {
               message += "Data de validade é obrigatória. ";
            }

            if (!card.CardBrand) {
               message += "Bandeira do cartão é obrigatória. ";
            }
         }
      }

      return message;
   }
}
