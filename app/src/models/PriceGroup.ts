import DomainEntity from "./DomainEntity";

export default class PriceGroup extends DomainEntity {
   private name?: string;
   private tax?: number;

   constructor(data?: Partial<PriceGroup>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get Tax(): number | undefined {
      return this.tax;
   }

   set Tax(tax: number) {
      this.tax = tax;
   }
}
