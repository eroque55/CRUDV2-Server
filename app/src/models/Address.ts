import DomainEntity from "./DomainEntity";
import { AddressType, StreetType, ResidenceType } from "@prisma/client";
import City from "./City";
import Customer from "./Customer";
import Freight from "./Freight";

class Address extends DomainEntity {
   customer?: Customer;
   nickname?: string;
   street?: string;
   number?: number;
   neighborhood?: string;
   cep?: string;
   complement?: string;
   city?: City;
   addressType?: AddressType;
   streetType?: StreetType;
   residenceType?: ResidenceType;
   freights: Freight[] = [];

   constructor(data?: Partial<Address>) {
      super();
      Object.assign(this, data);
   }
}

export default Address;
