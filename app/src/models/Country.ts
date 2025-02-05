import DomainEntity from "./DomainEntity";

export default class Country extends DomainEntity {
   private _name: string = "";

   get Name(): string {
      return this._name;
   }

   set Name(name: string) {
      this._name = name;
   }
}
