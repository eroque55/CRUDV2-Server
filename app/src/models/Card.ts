import CardBrand from "../enums/CardBrand";
import DomainEntity from "./DomainEntity";

export default class Card extends DomainEntity {
   private customerId: number = 0;
   private number: string = "";
   private cardholder: string = "";
   private cvv: string = "";
   private expirationDate: string = "";
   private preferential: boolean = false;
   private cardBrand: CardBrand | null = null;

   get CustomerId(): number {
      return this.customerId;
   }

   set CustomerId(customerId: number) {
      this.customerId = customerId;
   }

   get Number(): string {
      return this.number;
   }

   set Number(number: string) {
      this.number = number;
   }

   get CardHolder(): string {
      return this.cardholder;
   }

   set CardHolder(cardHolder: string) {
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

   get CardBrand(): CardBrand | null {
      return this.cardBrand;
   }

   set CardBrand(cardBrand: CardBrand) {
      this.cardBrand = cardBrand;
   }
}
