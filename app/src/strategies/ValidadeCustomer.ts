import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Customer from "../models/Customer";

export default class ValidateCustomer implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Customer) {
         const customer = entity as Customer;

         if (customer.Id === 0) {
            if (!customer.Name) {
               message += "Nome é obrigatório. ";
            }

            if (!customer.Cpf) {
               message += "CPF é obrigatório. ";
            }

            if (!customer.Email) {
               message += "E-mail é obrigatório. ";
            } else if (!customer.Email.includes("@")) {
               message += "E-mail inválido. ";
            }

            if (!customer.Password) {
               message += "Senha é obrigatória. ";
            } else {
               if (customer.Password.length < 8) {
                  message += "Senha deve ter no mínimo 8 caracteres. ";
               }
               if (!/[a-z]/.test(customer.Password)) {
                  message += "Senha deve ter no mínimo 1 letra minúscula. ";
               }
               if (!/[A-Z]/.test(customer.Password)) {
                  message += "Senha deve ter no mínimo 1 letra maiúscula. ";
               }
               if (!/[!@#$%^&*(),.?":{}|<>]/.test(customer.Password)) {
                  message += "Senha deve ter no mínimo 1 caractere especial. ";
               }
            }

            if (!customer.ConfPassword) {
               message += "Confirmação de senha é obrigatória. ";
            } else if (customer.Password !== customer.ConfPassword) {
               message += "Senhas não conferem. ";
            }

            if (!customer.Phone) {
               message += "Telefone é obrigatório. ";
            }

            if (!customer.Addresses || customer.Addresses.length < 2) {
               message +=
                  "É obrigatório um endereço de cobrança e um de entrega. ";
            }
         }
      }
      return message;
   }
}
