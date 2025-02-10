import DomainEntity from "./DomainEntity";
import AddressType from "../enums/AddressType";
import StreetType from "../enums/StreetType";
import ResidenceType from "../enums/ResidenceType";

export default class Address extends DomainEntity {
   private _customerId: number = 0;
   private _nickname: string = "";
   private _street: string = "";
   private _number: number = 0;
   private _neighborhood: string = "";
   private _cep: string = "";
   private _complement: string = "";
   private _cityId: number = 0;
   private _addressType: AddressType = AddressType.UNDEFINED;
   private _streetType: StreetType = StreetType.UNDEFINED;
   private _residenceType: ResidenceType = ResidenceType.UNDEFINED;

   get CustomerId(): number {
      return this._customerId;
   }

   set CustomerId(customerId: number) {
      this._customerId = customerId;
   }

   get Nickname(): string {
      return this._nickname;
   }

   set Nickname(nickname: string) {
      this._nickname = nickname;
   }

   get Street(): string {
      return this._street;
   }

   set Street(street: string) {
      this._street = street;
   }

   get Number(): number {
      return this._number;
   }

   set Number(number: number) {
      this._number = number;
   }

   get Neighborhood(): string {
      return this._neighborhood;
   }

   set Neighborhood(neighborhood: string) {
      this._neighborhood = neighborhood;
   }

   get Cep(): string {
      return this._cep;
   }

   set Cep(cep: string) {
      this._cep = cep;
   }

   get Complement(): string {
      return this._complement;
   }

   set Complement(complement: string) {
      this._complement = complement;
   }

   get CityId(): number {
      return this._cityId;
   }

   set CityId(cityId: number) {
      this._cityId = cityId;
   }

   get AddressType(): AddressType {
      return this._addressType;
   }

   set AddressType(addressType: AddressType) {
      this._addressType = addressType;
   }

   get StreetType(): StreetType {
      return this._streetType;
   }

   set StreetType(streetType: StreetType) {
      this._streetType = streetType;
   }

   get ResidenceType(): ResidenceType {
      return this._residenceType;
   }

   set ResidenceType(residenceType: ResidenceType) {
      this._residenceType = residenceType;
   }
}
