import Book from "./Book";
import Cart from "./Cart";

class BookToCart {
   amount?: number;
   updatedAt?: Date;
   status?: boolean;

   cart?: Cart;
   book?: Book;

   constructor(data?: Partial<BookToCart>) {
      Object.assign(this, data);
   }
}

export default BookToCart;
