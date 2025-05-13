import CardToSale from "./CardToSale";
import Customer from "./Customer";
import DomainEntity from "./DomainEntity";
import { CardBrand } from "@prisma/client";

class Card extends DomainEntity {
   customer?: Customer;
   number?: string;
   cardholder?: string;
   cvv?: string;
   expirationDate?: string;
   preferential?: boolean;
   cardBrand?: CardBrand;

   cardsToSales: CardToSale[] = [];

   constructor(data?: Partial<Card>) {
      super();
      Object.assign(this, data);
   }
}

export default Card;
