import DomainEntity from "./DomainEntity";
import Freight from "./Freight";

class Carrier extends DomainEntity {
   name?: string;
   cost?: number;
   freights?: Freight[];

   constructor(data?: Partial<Carrier>) {
      super();
      Object.assign(this, data);
   }
}

export default Carrier;
