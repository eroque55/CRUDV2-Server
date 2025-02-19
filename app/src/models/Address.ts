import DomainEntity from "./DomainEntity";
import { AddressType, StreetType, ResidenceType } from "@prisma/client";
import City from "./City";
import Customer from "./Customer";

export default class Address extends DomainEntity {
   private customer?: Customer;
   private nickname?: string;
   private street?: string;
   private number?: number;
   private neighborhood?: string;
   private cep?: string;
   private complement?: string;
   private city?: City;
   private addressType?: AddressType;
   private streetType?: StreetType;
   private residenceType?: ResidenceType;

   constructor(data?: Partial<Address>) {
      super();
      Object.assign(this, data);
   }

   get Customer(): Customer | undefined {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
   }

   get Nickname(): string | undefined {
      return this.nickname;
   }

   set Nickname(nickname: string) {
      this.nickname = nickname;
   }

   get Street(): string | undefined {
      return this.street;
   }

   set Street(street: string) {
      this.street = street;
   }

   get Number(): number | undefined {
      return this.number;
   }

   set Number(number: number) {
      this.number = number;
   }

   get Neighborhood(): string | undefined {
      return this.neighborhood;
   }

   set Neighborhood(neighborhood: string) {
      this.neighborhood = neighborhood;
   }

   get Cep(): string | undefined {
      return this.cep;
   }

   set Cep(cep: string) {
      this.cep = cep;
   }

   get Complement(): string | undefined {
      return this.complement;
   }

   set Complement(complement: string) {
      this.complement = complement;
   }

   get City(): City | undefined {
      return this.city;
   }

   set City(city: City) {
      this.city = city;
   }

   get AddressType(): AddressType | undefined {
      return this.addressType;
   }

   set AddressType(addressType: AddressType) {
      this.addressType = addressType;
   }

   get StreetType(): StreetType | undefined {
      return this.streetType;
   }

   set StreetType(streetType: StreetType) {
      this.streetType = streetType;
   }

   get ResidenceType(): ResidenceType | undefined {
      return this.residenceType;
   }

   set ResidenceType(residenceType: ResidenceType) {
      this.residenceType = residenceType;
   }
}
