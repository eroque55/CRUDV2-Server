import Book from "./Book";
import DomainEntity from "./DomainEntity";
import StockMovement from "./StockMovement";

export default class Stock extends DomainEntity {
   private amount?: number;
   private updatedAt?: Date;
   private stockMovement: StockMovement[] = [];

   private book?: Book;

   constructor(data?: Partial<Stock>) {
      super();
      Object.assign(this, data);
   }

   get Amount(): number | undefined {
      return this.amount;
   }

   set Amount(amount: number) {
      this.amount = amount;
   }

   get UpdatedAt(): Date | undefined {
      return this.updatedAt;
   }

   set UpdatedAt(updatedAt: Date) {
      this.updatedAt = updatedAt;
   }

   get Book(): Book | undefined {
      return this.book;
   }

   set Book(book: Book) {
      this.book = book;
   }

   get StockMovement(): StockMovement[] {
      return this.stockMovement;
   }

   set StockMovement(stockMovement: StockMovement[]) {
      this.stockMovement = stockMovement;
   }
}
