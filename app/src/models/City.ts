import DomainEntity from "./DomainEntity";

export default class City extends DomainEntity {
   private _name: string = "";
   private _stateId: number = 0;

   get Name(): string {
      return this._name;
   }

   set Name(name: string) {
      this._name = name;
   }

   get StateId(): number {
      return this._stateId;
   }

   set StateId(stateId: number) {
      this._stateId = stateId;
   }
}
