import DomainEntity from "./DomainEntity";
import Freight from "./Freight";

class Carrier extends DomainEntity {
   private name?: string;
   private cost?: number;
   private freights?: Freight[];

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

   get Freights(): Freight[] | undefined {
      return this.freights;
   }

   set Freights(freights: Freight[]) {
      this.freights = freights;
   }
}

export default Carrier;
