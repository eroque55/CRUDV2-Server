import { CouponType } from "@prisma/client";
import DomainEntity from "./DomainEntity";

class Coupon extends DomainEntity {
   private name?: string;
   private couponType?: CouponType;
   private discount?: number;

   constructor(data?: Partial<Coupon>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get CouponType(): CouponType | undefined {
      return this.couponType;
   }

   set CouponType(couponType: CouponType) {
      this.couponType = couponType;
   }

   get Discount(): number | undefined {
      return this.discount;
   }

   set Discount(discount: number) {
      this.discount = discount;
   }
}

export default Coupon;
