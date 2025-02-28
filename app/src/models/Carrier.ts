import DomainEntity from "./DomainEntity";

export default class Carrier extends DomainEntity {
   private name?: string;
   private cost?: number;

   constructor(data?: Partial<Carrier>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get Cost(): number | undefined {
      return this.cost;
   }

   set Cost(cost: number) {
      this.cost = cost;
   }
}
