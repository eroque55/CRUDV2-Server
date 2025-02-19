import State from "./State";
import DomainEntity from "./DomainEntity";

export default class Country extends DomainEntity {
   private name?: string;
   private states: State[] = [];

   constructor(data?: Partial<Country>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get States(): State[] {
      return this.states;
   }

   set States(states: State[]) {
      this.states = states;
   }
}
