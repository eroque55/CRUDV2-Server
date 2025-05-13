import Book from "./Book";
import Category from "./Category";

class BookToCategory {
   book?: Book;
   category?: Category;

   constructor(data?: Partial<BookToCategory>) {
      Object.assign(this, data);
   }
}

export default BookToCategory;
