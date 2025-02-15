import DomainEntity from "./DomainEntity";
import PhoneType from "../enums/PhoneType";

export default class Phone extends DomainEntity {
   private customerId: number = 0;
   private ddd: string = "";
   private number: string = "";
   private phoneType: PhoneType | null = null;

   get CustomerId(): number {
      return this.customerId;
   }

   set CustomerId(customerId: number) {
      this.customerId = customerId;
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

   get PhoneType(): PhoneType | null {
      return this.phoneType;
   }

   set PhoneType(phoneType: PhoneType) {
      this.phoneType = phoneType;
   }
}
