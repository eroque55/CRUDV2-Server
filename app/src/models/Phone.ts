import DomainEntity from "./DomainEntity";
import Customer from "./Customer";
import { PhoneType } from "@prisma/client";

class Phone extends DomainEntity {
   customer?: Customer;
   ddd?: string;
   number?: string;
   phoneType?: PhoneType;

   constructor(data?: Partial<Phone>) {
      super();
      Object.assign(this, data);
   }
}

export default Phone;
