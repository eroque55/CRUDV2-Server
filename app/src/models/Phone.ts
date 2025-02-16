import DomainEntity from "./DomainEntity";
import Customer from "./Customer";
import { PhoneType } from "@prisma/client";

export default class Phone extends DomainEntity {
   private customer: Customer = new Customer();
   private ddd: string = "";
   private number: string = "";
   private phoneType: PhoneType = "CELULAR";

   get Customer(): Customer {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
   }

   get Ddd(): string {
      return this.ddd;
   }

   set Ddd(ddd: string) {
      this.ddd = ddd;
   }

   get Number(): string {
      return this.number;
   }

   set Number(numero: string) {
      this.number = numero;
   }

   get PhoneType(): PhoneType {
      return this.phoneType;
   }

   set PhoneType(phoneType: PhoneType) {
      this.phoneType = phoneType;
   }
}
