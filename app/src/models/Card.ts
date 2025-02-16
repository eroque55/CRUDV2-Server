import Customer from "./Customer";
import DomainEntity from "./DomainEntity";
import { CardBrand } from "@prisma/client";

export default class Card extends DomainEntity {
   private customer: Customer = new Customer();
   private number: string = "";
   private cardholder: string = "";
   private cvv: string = "";
   private expirationDate: string = "";
   private preferential: boolean = false;
   private cardBrand: CardBrand = "OUTRA";

   get Customer(): Customer {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
   }

   get Number(): string {
      return this.number;
   }

   set Number(number: string) {
      this.number = number;
   }

   get Cardholder(): string {
      return this.cardholder;
   }

   set Cardholder(cardHolder: string) {
      this.cardholder = cardHolder;
   }

   get Cvv(): string {
      return this.cvv;
   }

   set Cvv(cvv: string) {
      this.cvv = cvv;
   }

   get ExpirationDate(): string {
      return this.expirationDate;
   }

   set ExpirationDate(expirationDate: string) {
      this.expirationDate = expirationDate;
   }

   get Preferential(): boolean {
      return this.preferential;
   }

   set Preferential(preferential: boolean) {
      this.preferential = preferential;
   }

   get CardBrand(): CardBrand {
      return this.cardBrand;
   }

   set CardBrand(cardBrand: CardBrand) {
      this.cardBrand = cardBrand;
   }
}
