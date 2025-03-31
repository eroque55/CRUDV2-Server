import BookToCategory from "./BookToCategory";
import DomainEntity from "./DomainEntity";

class Category extends DomainEntity {
   private name?: string;
   private booksToCategory: BookToCategory[] = [];

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

   get BooksToCategory(): BookToCategory[] {
      return this.booksToCategory;
   }

   set BooksToCategory(booksToCategory: BookToCategory[]) {
      this.booksToCategory = booksToCategory;
   }
}

export default Category;
