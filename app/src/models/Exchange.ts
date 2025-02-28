import { ExchangeStatus } from "@prisma/client";
import DomainEntity from "./DomainEntity";
import Sale from "./Sale";
import Book from "./Book";

export default class Exchange extends DomainEntity {
   private status?: ExchangeStatus;
   private createdAt?: Date;
   private updatedAt?: Date;

   private sale?: Sale;
   private book?: Book;

   constructor(data?: Partial<Exchange>) {
      super();
      Object.assign(this, data);
   }

   get Status(): ExchangeStatus | undefined {
      return this.status;
   }

   set Status(status: ExchangeStatus) {
      this.status = status;
   }

   get CreatedAt(): Date | undefined {
      return this.createdAt;
   }

   set CreatedAt(createdAt: Date) {
      this.createdAt = createdAt;
   }

   get UpdatedAt(): Date | undefined {
      return this.updatedAt;
   }

   set UpdatedAt(updatedAt: Date) {
      this.updatedAt = updatedAt;
   }

   get Sale(): Sale | undefined {
      return this.sale;
   }

   set Sale(sale: Sale) {
      this.sale = sale;
   }

   get Book(): Book | undefined {
      return this.book;
   }

   set Book(book: Book) {
      this.book = book;
   }
}
