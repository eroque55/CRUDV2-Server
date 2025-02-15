import DomainEntity from "./DomainEntity";
import AddressType from "../enums/AddressType";
import StreetType from "../enums/StreetType";
import ResidenceType from "../enums/ResidenceType";
import City from "./City";

export default class Address extends DomainEntity {
   private customerId: number = 0;
   private nickname: string = "";
   private street: string = "";
   private number: number = 0;
   private neighborhood: string = "";
   private cep: string = "";
   private complement: string = "";
   private city: City = new City();
   private addressType: AddressType | null = null;
   private streetType: StreetType | null = null;
   private residenceType: ResidenceType | null = null;

   get CustomerId(): number {
      return this.customerId;
   }

   set CustomerId(customerId: number) {
      this.customerId = customerId;
   }

   get Nickname(): string {
      return this.nickname;
   }

   set Nickname(nickname: string) {
      this.nickname = nickname;
   }

   get Street(): string {
      return this.street;
   }

   set Street(street: string) {
      this.street = street;
   }

   get Number(): number {
      return this.number;
   }

   set Number(number: number) {
      this.number = number;
   }

   get Neighborhood(): string {
      return this.neighborhood;
   }

   set Neighborhood(neighborhood: string) {
      this.neighborhood = neighborhood;
   }

   get Cep(): string {
      return this.cep;
   }

   set Cep(cep: string) {
      this.cep = cep;
   }

   get Complement(): string {
      return this.complement;
   }

   set Complement(complement: string) {
      this.complement = complement;
   }

   get City(): City {
      return this.city;
   }

   set City(city: City) {
      this.city = city;
   }

   get AddressType(): AddressType | null {
      return this.addressType;
   }

   set AddressType(addressType: AddressType) {
      this.addressType = addressType;
   }

   get StreetType(): StreetType | null {
      return this.streetType;
   }

   set StreetType(streetType: StreetType) {
      this.streetType = streetType;
   }

   get ResidenceType(): ResidenceType | null {
      return this.residenceType;
   }

   set ResidenceType(residenceType: ResidenceType) {
      this.residenceType = residenceType;
   }
}
