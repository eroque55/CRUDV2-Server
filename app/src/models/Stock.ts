import Book from "./Book";
import DomainEntity from "./DomainEntity";
import StockMovement from "./StockMovement";

export default class Stock extends DomainEntity {
   amount?: number;
   updatedAt?: Date;
   stockMovement: StockMovement[] = [];

   book?: Book;

   constructor(data?: Partial<Stock>) {
      super();
      Object.assign(this, data);
   }
}
