import BookToCart from "./BookToCart";
import Customer from "./Customer";
import DomainEntity from "./DomainEntity";
import Sale from "./Sale";

class Cart extends DomainEntity {
   private customer?: Customer;
   private sale?: Sale;
   private bookToCart: BookToCart[] = [];

   constructor(data?: Partial<Cart>) {
      super();
      Object.assign(this, data);
   }

   get Customer(): Customer | undefined {
      return this.customer;
   }

   set Customer(customer: Customer) {
      this.customer = customer;
   }

   get BookToCart(): BookToCart[] {
      return this.bookToCart;
   }

   set BookToCart(bookToCart: BookToCart[]) {
      this.bookToCart = bookToCart;
   }

   get Sale(): Sale | undefined {
      return this.sale;
   }

   set Sale(sale: Sale) {
      this.sale = sale;
   }
}

export default Cart;
