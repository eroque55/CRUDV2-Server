import { SaleStatus } from "@prisma/client";
import DomainEntity from "./DomainEntity";
import Coupon from "./Coupon";
import Cart from "./Cart";
import Freight from "./Freight";
import CardToSale from "./CardToSale";

class Sale extends DomainEntity {
   totalValue?: number;
   status?: SaleStatus;
   createdAt?: Date;
   paymentMethod?: string;

   coupons: Coupon[] = [];
   cart?: Cart;
   freight?: Freight;
   cardsToSales: CardToSale[] = [];

   constructor(data?: Partial<Sale>) {
      super();
      Object.assign(this, data);
   }
}

export default Sale;
