import Book from "./Book";
import DomainEntity from "./DomainEntity";

export default class Category extends DomainEntity {
   private name?: string;
   private books: Book[] = [];

   constructor(data?: Partial<Category>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get Books(): Book[] {
      return this.books;
   }

   set Books(books: Book[]) {
      this.books = books;
   }
}
