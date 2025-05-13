import Book from "./Book";
import DomainEntity from "./DomainEntity";

export default class ReasonCategory extends DomainEntity {
   description?: string;
   isActivation?: boolean;

   books: Book[] = [];

   constructor(data?: Partial<ReasonCategory>) {
      super();
      Object.assign(this, data);
   }
}
