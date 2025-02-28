import Book from "./Book";
import DomainEntity from "./DomainEntity";

export default class ReasonCategory extends DomainEntity {
   private description?: string;
   private isActivation?: boolean;

   private books: Book[] = [];

   constructor(data?: Partial<ReasonCategory>) {
      super();
      Object.assign(this, data);
   }

   get Description(): string | undefined {
      return this.description;
   }

   set Description(description: string) {
      this.description = description;
   }

   get IsActivation(): boolean | undefined {
      return this.isActivation;
   }

   set IsActivation(isActivation: boolean) {
      this.isActivation = isActivation;
   }

   get Books(): Book[] {
      return this.books;
   }

   set Books(books: Book[]) {
      this.books = books;
   }
}
