import Book from "./Book";
import DomainEntity from "./DomainEntity";

export default class BookDimension extends DomainEntity {
   private height?: number;
   private width?: number;
   private weight?: number;
   private thickness?: number;
   private book?: Book;

   constructor(data?: Partial<BookDimension>) {
      super();
      Object.assign(this, data);
   }

   get Height(): number | undefined {
      return this.height;
   }

   set Height(height: number) {
      this.height = height;
   }

   get Width(): number | undefined {
      return this.width;
   }

   set Width(width: number) {
      this.width = width;
   }

   get Weight(): number | undefined {
      return this.weight;
   }

   set Weight(weight: number) {
      this.weight = weight;
   }

   get Thickness(): number | undefined {
      return this.thickness;
   }

   set Thickness(thickness: number) {
      this.thickness = thickness;
   }

   get Book(): Book | undefined {
      return this.book;
   }

   set Book(book: Book) {
      this.book = book;
   }
}
