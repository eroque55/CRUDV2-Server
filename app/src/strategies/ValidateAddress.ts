import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Address from "../models/Address";

export default class ValidateAddress implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Address) {
         const address = entity as Address;

         if (address.Id === 0) {
            if (address.CustomerId === 0) {
               message += "Cliente é obrigatório. ";
            }

            if (!address.Nickname) {
               message += "Apelido é obrigatório. ";
            }

            if (!address.Street) {
               message += "Logradouro é obrigatório. ";
            }

            if (!address.Neighborhood) {
               message += "Bairro é obrigatório. ";
            }

            if (!address.Cep) {
               message += "CEP é obrigatório. ";
            } else if (address.Cep.length !== 8) {
               message += "CEP inválido. ";
            }

            if (address.City.Id === 0) {
               message += "Cidade é obrigatório. ";
            }

            if (!address.AddressType) {
               message += "Tipo de endereço é obrigatório. ";
            }

            if (!address.StreetType) {
               message += "Tipo de logradouro é obrigatório. ";
            }

            if (!address.ResidenceType) {
               message += "Tipo de residência é obrigatória. ";
            }
         }
      }
      return message;
   }
}
