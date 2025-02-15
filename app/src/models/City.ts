import DomainEntity from "./DomainEntity";
import State from "./State";

export default class City extends DomainEntity {
   private name: string = "";
   private state: State = new State();

   get Name(): string {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get State(): State {
      return this.state;
   }

   set State(state: State) {
      this.state = state;
   }
}
