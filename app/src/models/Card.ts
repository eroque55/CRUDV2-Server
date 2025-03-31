import CardToSale from "./CardToSale";
import Customer from "./Customer";
import DomainEntity from "./DomainEntity";
import { CardBrand } from "@prisma/client";

class Card extends DomainEntity {
   private customer?: Customer;
   private number?: string;
   private cardholder?: string;
   private cvv?: string;
   private expirationDate?: string;
   private preferential?: boolean;
   private cardBrand?: CardBrand;

   private cardsToSales: CardToSale[] = [];

   constructor(data?: Partial<Card>) {
      super();
      Object.assign(this, data);
   }

   get Customer(): Customer | undefined {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
   }

   get Number(): string | undefined {
      return this.number;
   }

   set Number(number: string) {
      this.number = number;
   }

   get Cardholder(): string | undefined {
      return this.cardholder;
   }

   set Cardholder(cardHolder: string) {
      this.cardholder = cardHolder;
   }

   get Cvv(): string | undefined {
      return this.cvv;
   }

   set Cvv(cvv: string) {
      this.cvv = cvv;
   }

   get ExpirationDate(): string | undefined {
      return this.expirationDate;
   }

   set ExpirationDate(expirationDate: string) {
      this.expirationDate = expirationDate;
   }

   get Preferential(): boolean | undefined {
      return this.preferential;
   }

   set Preferential(preferential: boolean) {
      this.preferential = preferential;
   }

   get CardBrand(): CardBrand | undefined {
      return this.cardBrand;
   }

   set CardBrand(cardBrand: CardBrand) {
      this.cardBrand = cardBrand;
   }

   get CardsToSales(): CardToSale[] {
      return this.cardsToSales;
   }

   set CardsToSales(cardsToSales: CardToSale[]) {
      this.cardsToSales = cardsToSales;
   }
}

export default Card;
