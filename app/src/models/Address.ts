import DomainEntity from "./DomainEntity";
import { $Enums } from "@prisma/client";
import City from "./City";
import Customer from "./Customer";

export default class Address extends DomainEntity {
   private customer: Customer = new Customer();
   private nickname: string = "";
   private street: string = "";
   private number: number = 0;
   private neighborhood: string = "";
   private cep: string = "";
   private complement: string = "";
   private city: City = new City();
   private addressType: $Enums.AddressType = "COBRANCA";
   private streetType: $Enums.StreetType = "OUTRO";
   private residenceType: $Enums.ResidenceType = "OUTRO";

   get Customer(): Customer {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
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

   get AddressType(): $Enums.AddressType {
      return this.addressType;
   }

   set AddressType(addressType: $Enums.AddressType) {
      this.addressType = addressType;
   }

   get StreetType(): $Enums.StreetType {
      return this.streetType;
   }

   set StreetType(streetType: $Enums.StreetType) {
      this.streetType = streetType;
   }

   get ResidenceType(): $Enums.ResidenceType {
      return this.residenceType;
   }

   set ResidenceType(residenceType: $Enums.ResidenceType) {
      this.residenceType = residenceType;
   }
}
