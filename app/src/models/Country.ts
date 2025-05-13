import State from "./State";
import DomainEntity from "./DomainEntity";

class Country extends DomainEntity {
   name?: string;
   states: State[] = [];

   constructor(data?: Partial<Country>) {
      super();
      Object.assign(this, data);
   }
}

export default Country;
