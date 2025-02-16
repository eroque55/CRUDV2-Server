import State from "./State";
import DomainEntity from "./DomainEntity";

export default class Country extends DomainEntity {
   private name: string = "";
   private states: State[] = [];

   get Name(): string {
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
