import DomainEntity from "./DomainEntity";
import State from "./State";

export default class City extends DomainEntity {
   private name?: string;
   private state?: State;

   constructor(data?: Partial<City>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get State(): State | undefined {
      return this.state;
   }

   set State(state: State) {
      this.state = state;
   }
}
