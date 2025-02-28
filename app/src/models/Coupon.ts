import DomainEntity from "./DomainEntity";

export default class Coupon extends DomainEntity {
   private name?: string;
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

   get Discount(): number | undefined {
      return this.discount;
   }

   set Discount(discount: number) {
      this.discount = discount;
   }
}
