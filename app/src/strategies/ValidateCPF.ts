import IStrategy from "./IStrategy";
import DomainEntity from "../models/DomainEntity";

import Customer from "../models/Customer";

export default class ValidateCPF implements IStrategy {
   execute(entity: DomainEntity): string {
      let message = "";

      if (entity instanceof Customer) {
         const customer = entity as Customer;

         if (customer.Id === 0) {
            const cpf = customer.Cpf;

            if (!this.checkLength(cpf) || this.checkRepeatedDigits(cpf)) {
               message += "CPF inválido";
            }

            if (!this.checkVerificationDigits(cpf)) {
               message += "CPF inválido";
            }
         }
      }

      return message;
   }

   private checkLength(cpf: string): boolean {
      return cpf.length === 11;
   }

   private checkRepeatedDigits(cpf: string): boolean {
      return cpf.split("").every((char) => char === cpf[0]);
   }

   private checkVerificationDigits(cpf: string): boolean {
      const calculateDigit = (cpf: string, initialWeight: number): number => {
         let sum = 0;

         for (let i = 0; i < initialWeight - 1; i++) {
            sum += parseInt(cpf.charAt(i)) * (initialWeight - i);
         }

         const remainder = sum % 11;
         return remainder < 2 ? 0 : 11 - remainder;
      };

      const firstDigit = calculateDigit(cpf, 10);
      const secondDigit = calculateDigit(cpf, 11);

      return (
         firstDigit === parseInt(cpf.charAt(9)) &&
         secondDigit === parseInt(cpf.charAt(10))
      );
   }
}
