import Address from "./Address";
import Carrier from "./Carrier";
import DomainEntity from "./DomainEntity";
import Sale from "./Sale";

class Freight extends DomainEntity {
   deliveryTime?: number;
   address?: Address;
   carrier?: Carrier;

   sales: Sale[] = [];

   constructor(data?: Partial<Freight>) {
      super();
      Object.assign(this, data);
   }
}

export default Freight;
