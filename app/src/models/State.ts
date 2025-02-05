import DomainEntity from "./DomainEntity";

export default class State extends DomainEntity {
   private _name: string = "";
   private _countryId: number = 0;

   get Name(): string {
      return this._name;
   }

   set Name(nome: string) {
      this._name = nome;
   }

   get CountryId(): number {
      return this._countryId;
   }

   set CountryId(countryId: number) {
      this._countryId = countryId;
   }
}
