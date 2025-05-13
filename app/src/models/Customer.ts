import DomainEntity from "./DomainEntity";
import { Gender } from "@prisma/client";
import Address from "./Address";
import Card from "./Card";
import Phone from "./Phone";
import Cart from "./Cart";

class Customer extends DomainEntity {
   name?: string;
   birthDate?: Date;
   cpf?: string;
   gender?: Gender;
   email?: string;
   password?: string;
   confPassword?: string;
   status?: boolean;
   ranking?: number;

   phone?: Phone;
   cards: Card[] = [];
   addresses: Address[] = [];
   carts: Cart[] = [];

   constructor(data?: Partial<Customer>) {
      super();
      Object.assign(this, data);
   }
}

export default Customer;
