import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Customer from "../models/Customer";

export default class ValidateCustomer implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Customer) {
         const customer = entity as Customer;

         if (customer.id === 0) {
            if (!customer.name) {
               message += "Nome é obrigatório. ";
            }

            if (!customer.cpf) {
               message += "CPF é obrigatório. ";
            }

            if (!customer.email) {
               message += "E-mail é obrigatório. ";
            } else if (!customer.email.includes("@")) {
               message += "E-mail inválido. ";
            }

            if (!customer.password) {
               message += "Senha é obrigatória. ";
            } else {
               if (customer.password.length < 8) {
                  message += "Senha deve ter no mínimo 8 caracteres. ";
               }
               if (!/[a-z]/.test(customer.password)) {
                  message += "Senha deve ter no mínimo 1 letra minúscula. ";
               }
               if (!/[A-Z]/.test(customer.password)) {
                  message += "Senha deve ter no mínimo 1 letra maiúscula. ";
               }
               if (!/[!@#$%^&*(),.?":{}|<>]/.test(customer.password)) {
                  message += "Senha deve ter no mínimo 1 caractere especial. ";
               }
            }

            if (!customer.confPassword) {
               message += "Confirmação de senha é obrigatória. ";
            } else if (customer.password !== customer.confPassword) {
               message += "Senhas não conferem. ";
            }

            if (!customer.phone) {
               message += "Telefone é obrigatório. ";
            }

            if (!customer.addresses || customer.addresses.length < 2) {
               message +=
                  "É obrigatório um endereço de cobrança e um de entrega. ";
            }
         }
      }
      return message;
   }
}
