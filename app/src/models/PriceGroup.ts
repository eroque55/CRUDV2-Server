import Book from "./Book";
import DomainEntity from "./DomainEntity";

class PriceGroup extends DomainEntity {
   private name?: string;
   private tax?: number;

   private books: Book[] = [];

   constructor(data?: Partial<PriceGroup>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get Tax(): number | undefined {
      return this.tax;
   }

   set Tax(tax: number) {
      this.tax = tax;
   }

   get Books(): Book[] {
      return this.books;
   }

   set Books(books: Book[]) {
      this.books = books;
   }
}

export default PriceGroup;
