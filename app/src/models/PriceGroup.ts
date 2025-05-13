import Book from "./Book";
import DomainEntity from "./DomainEntity";

class PriceGroup extends DomainEntity {
   name?: string;
   tax?: number;

   books: Book[] = [];

   constructor(data?: Partial<PriceGroup>) {
      super();
      Object.assign(this, data);
   }
}

export default PriceGroup;
