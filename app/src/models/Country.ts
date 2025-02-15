import DomainEntity from "./DomainEntity";

export default class Country extends DomainEntity {
   private name: string = "";

   get Name(): string {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }
}
