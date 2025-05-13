import Address from "./Address";
import DomainEntity from "./DomainEntity";
import State from "./State";

class City extends DomainEntity {
   name?: string;
   state?: State;

   addresses: Address[] = [];

   constructor(data?: Partial<City>) {
      super();
      Object.assign(this, data);
   }
}

export default City;
