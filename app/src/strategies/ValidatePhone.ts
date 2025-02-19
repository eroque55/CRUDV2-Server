import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Phone from "../models/Phone";

export default class ValidatePhone implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Phone) {
         const phone = entity as Phone;

         if (phone.Id === 0) {
            if (!phone.Customer?.Id) {
               message += "Cliente é obrigatório. ";
            }

            if (!phone.Ddd) {
               message += "DDD é obrigatório. ";
            }

            if (!phone.Number) {
               message += "Número é obrigatório. ";
            } else if (phone.Number.length < 8 || phone.Number.length > 9) {
               message += "Número de telefone inválido. ";
            }

            if (!phone.PhoneType) {
               message += "Tipo de telefone é obrigatório. ";
            }
         }
      }
      return message;
   }
}
