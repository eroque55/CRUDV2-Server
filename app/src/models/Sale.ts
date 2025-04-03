import { SaleStatus } from "@prisma/client";
import DomainEntity from "./DomainEntity";
import Coupon from "./Coupon";
import Cart from "./Cart";
import Freight from "./Freight";
import CardToSale from "./CardToSale";

class Sale extends DomainEntity {
   private totalValue?: number;
   private status?: SaleStatus;
   private createdAt?: Date;
   private paymentMethod?: string;

   private coupons: Coupon[] = [];
   private cart?: Cart;
   private freight?: Freight;
   private cardsToSales: CardToSale[] = [];

   constructor(data?: Partial<Sale>) {
      super();
      Object.assign(this, data);
   }

   get TotalValue(): number | undefined {
      return this.totalValue;
   }

   set TotalValue(totalValue: number) {
      this.totalValue = totalValue;
   }

   get Status(): SaleStatus | undefined {
      return this.status;
   }

   set Status(status: SaleStatus) {
      this.status = status;
   }

   get CreatedAt(): Date | undefined {
      return this.createdAt;
   }

   set CreatedAt(createdAt: Date) {
      this.createdAt = createdAt;
   }

   get PaymentMethod(): string | undefined {
      return this.paymentMethod;
   }

   set PaymentMethod(paymentMethod: string) {
      this.paymentMethod = paymentMethod;
   }

   get Coupons(): Coupon[] {
      return this.coupons;
   }

   set Coupons(coupons: Coupon[]) {
      this.coupons = coupons;
   }

   get Cart(): Cart | undefined {
      return this.cart;
   }

   set Cart(cart: Cart) {
      this.cart = cart;
   }

   get Freight(): Freight | undefined {
      return this.freight;
   }

   set Freight(freight: Freight) {
      this.freight = freight;
   }

   get CardsToSales(): CardToSale[] {
      return this.cardsToSales;
   }

   set CardsToSales(cardsToSales: CardToSale[]) {
      this.cardsToSales = cardsToSales;
   }
}

export default Sale;
