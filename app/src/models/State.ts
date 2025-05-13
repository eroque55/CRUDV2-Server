import City from "./City";
import Country from "./Country";
import DomainEntity from "./DomainEntity";

class State extends DomainEntity {
   name?: string;
   country?: Country;
   cities: City[] = [];

   constructor(data?: Partial<State>) {
      super();
      Object.assign(this, data);
   }
}

export default State;
