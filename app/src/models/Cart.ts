import BookToCart from "./BookToCart";
import Customer from "./Customer";
import DomainEntity from "./DomainEntity";
import Sale from "./Sale";

class Cart extends DomainEntity {
   customer?: Customer;
   status?: boolean;
   sale?: Sale;
   bookToCart: BookToCart[] = [];

   constructor(data?: Partial<Cart>) {
      super();
      Object.assign(this, data);
   }
}

export default Cart;
