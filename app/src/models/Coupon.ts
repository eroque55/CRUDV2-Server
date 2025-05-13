import { CouponType } from "@prisma/client";
import DomainEntity from "./DomainEntity";

class Coupon extends DomainEntity {
   name?: string;
   couponType?: CouponType;
   discount?: number;

   constructor(data?: Partial<Coupon>) {
      super();
      Object.assign(this, data);
   }
}

export default Coupon;
