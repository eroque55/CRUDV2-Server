import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Phone from "../models/Phone";

export default class ValidatePhone implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Phone) {
         const phone = entity as Phone;

         if (phone.id === 0) {
            if (!phone.customer?.id) {
               message += "Cliente é obrigatório. ";
            }

            if (!phone.ddd) {
               message += "DDD é obrigatório. ";
            }

            if (!phone.number) {
               message += "Número é obrigatório. ";
            } else if (phone.number.length < 8 || phone.number.length > 9) {
               message += "Número de telefone inválido. ";
            }

            if (!phone.phoneType) {
               message += "Tipo de telefone é obrigatório. ";
            }
         }
      }
      return message;
   }
}
