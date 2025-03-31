import Book from "./Book";
import Cart from "./Cart";

class BookToCart {
   private ammount?: number;
   private updatedAt?: Date;
   private status?: boolean;

   private cart?: Cart;
   private book?: Book;

   constructor(data?: Partial<BookToCart>) {
      Object.assign(this, data);
   }

   get Ammount(): number | undefined {
      return this.ammount;
   }

   set Ammount(ammount: number) {
      this.ammount = ammount;
   }

   get UpdatedAt(): Date | undefined {
      return this.updatedAt;
   }

   set UpdatedAt(updatedAt: Date) {
      this.updatedAt = updatedAt;
   }

   get Status(): boolean | undefined {
      return this.status;
   }

   set Status(status: boolean) {
      this.status = status;
   }

   get Cart(): Cart | undefined {
      return this.cart;
   }

   set Cart(cart: Cart) {
      this.cart = cart;
   }

   get Book(): Book | undefined {
      return this.book;
   }

   set Book(book: Book) {
      this.book = book;
   }
}

export default BookToCart;
