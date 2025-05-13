import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Address from "../models/Address";

export default class ValidateAddress implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Address) {
         const address = entity as Address;

         if (address.id === 0) {
            if (!address.customer?.id) {
               message += "Cliente é obrigatório. ";
            }

            if (!address.nickname) {
               message += "Apelido é obrigatório. ";
            }

            if (!address.street) {
               message += "Logradouro é obrigatório. ";
            }

            if (!address.neighborhood) {
               message += "Bairro é obrigatório. ";
            }

            if (!address.cep) {
               message += "CEP é obrigatório. ";
            } else if (address.cep.length !== 8) {
               message += "CEP inválido. ";
            }

            if (address.city?.id === 0) {
               message += "Cidade é obrigatório. ";
            }

            if (!address.addressType) {
               message += "Tipo de endereço é obrigatório. ";
            }

            if (!address.streetType) {
               message += "Tipo de logradouro é obrigatório. ";
            }

            if (!address.residenceType) {
               message += "Tipo de residência é obrigatória. ";
            }
         }
      }
      return message;
   }
}
