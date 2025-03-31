import DomainEntity from "./DomainEntity";
import Customer from "./Customer";
import { PhoneType } from "@prisma/client";

class Phone extends DomainEntity {
   private customer?: Customer;
   private ddd?: string;
   private number?: string;
   private phoneType?: PhoneType;

   constructor(data?: Partial<Phone>) {
      super();
      Object.assign(this, data);
   }

   get Customer(): Customer | undefined {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
   }

   get Ddd(): string | undefined {
      return this.ddd;
   }

   set Ddd(ddd: string) {
      this.ddd = ddd;
   }

   get Number(): string | undefined {
      return this.number;
   }

   set Number(numero: string) {
      this.number = numero;
   }

   get PhoneType(): PhoneType | undefined {
      return this.phoneType;
   }

   set PhoneType(phoneType: PhoneType) {
      this.phoneType = phoneType;
   }
}

export default Phone;
