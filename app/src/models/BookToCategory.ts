import Book from "./Book";
import Category from "./Category";

class BookToCategory {
   private book?: Book;
   private category?: Category;

   constructor(data?: Partial<BookToCategory>) {
      Object.assign(this, data);
   }

   get Book(): Book | undefined {
      return this.book;
   }

   set Book(book: Book) {
      this.book = book;
   }

   get Category(): Category | undefined {
      return this.category;
   }

   set Category(category: Category) {
      this.category = category;
   }
}

export default BookToCategory;
