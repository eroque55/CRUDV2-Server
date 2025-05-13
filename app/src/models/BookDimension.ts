import Book from "./Book";
import DomainEntity from "./DomainEntity";

class BookDimension extends DomainEntity {
   book?: Book;
   height?: number;
   width?: number;
   weight?: number;
   thickness?: number;

   constructor(data?: Partial<BookDimension>) {
      super();
      Object.assign(this, data);
   }
}

export default BookDimension;
