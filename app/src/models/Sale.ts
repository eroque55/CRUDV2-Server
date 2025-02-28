import { SaleStatus } from "@prisma/client";
import DomainEntity from "./DomainEntity";
import Coupon from "./Coupon";
import Cart from "./Cart";
import Card from "./Card";
import Freight from "./Freight";
import Exchange from "./Exchange";

export default class Sale extends DomainEntity {
   private totalValue?: number;
   private status?: SaleStatus;
   private createdAt?: Date;
   private paymentMethod?: string;

   private coupon?: Coupon;
   private cart?: Cart;
   private freight?: Freight;
   private cards: Card[] = [];
   private exanges: Exchange[] = [];

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

   get Coupon(): Coupon | undefined {
      return this.coupon;
   }

   set Coupon(coupon: Coupon) {
      this.coupon = coupon;
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

   get Cards(): Card[] {
      return this.cards;
   }

   set Cards(cards: Card[]) {
      this.cards = cards;
   }

   get Exanges(): Exchange[] {
      return this.exanges;
   }

   set Exanges(exanges: Exchange[]) {
      this.exanges = exanges;
   }
}
