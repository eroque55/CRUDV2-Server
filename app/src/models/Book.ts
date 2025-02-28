import BookDimension from "./BookDimension";
import Category from "./Category";
import DomainEntity from "./DomainEntity";
import PriceGroup from "./PriceGroup";
import ReasonCategory from "./ReasonCategory";
import Stock from "./Stock";

export default class Book extends DomainEntity {
   private title?: string;
   private author?: string;
   private status?: boolean;
   private year?: number;
   private synopsis?: string;
   private numberPages?: number;
   private publisher?: string;
   private edition?: number;
   private isbn?: string;
   private barcode?: string;
   private inativatonReason?: string;

   private bookDimension?: BookDimension;
   private stock?: Stock;
   private priceGroup?: PriceGroup;
   private categories: Category[] = [];
   private reasonCategory?: ReasonCategory;

   constructor(data?: Partial<Category>) {
      super();
      Object.assign(this, data);
   }

   get Title(): string | undefined {
      return this.title;
   }

   set Title(title: string) {
      this.title = title;
   }

   get Author(): string | undefined {
      return this.author;
   }

   set Author(author: string) {
      this.author = author;
   }

   get Status(): boolean | undefined {
      return this.status;
   }

   set Status(status: boolean) {
      this.status = status;
   }

   get Year(): number | undefined {
      return this.year;
   }

   set Year(year: number) {
      this.year = year;
   }

   get Synopsis(): string | undefined {
      return this.synopsis;
   }

   set Synopsis(synopsis: string) {
      this.synopsis = synopsis;
   }

   get NumberPages(): number | undefined {
      return this.numberPages;
   }

   set NumberPages(numberPages: number) {
      this.numberPages = numberPages;
   }

   get Publisher(): string | undefined {
      return this.publisher;
   }

   set Publisher(publisher: string) {
      this.publisher = publisher;
   }

   get Edition(): number | undefined {
      return this.edition;
   }

   set Edition(edition: number) {
      this.edition = edition;
   }

   get Isbn(): string | undefined {
      return this.isbn;
   }

   set Isbn(isbn: string) {
      this.isbn = isbn;
   }

   get Barcode(): string | undefined {
      return this.barcode;
   }

   set Barcode(barcode: string) {
      this.barcode = barcode;
   }

   get InativatonReason(): string | undefined {
      return this.inativatonReason;
   }

   set InativatonReason(inativatonReason: string) {
      this.inativatonReason = inativatonReason;
   }

   get BookDimension(): BookDimension | undefined {
      return this.bookDimension;
   }

   set BookDimension(bookDimension: BookDimension) {
      this.bookDimension = bookDimension;
   }

   get Stock(): Stock | undefined {
      return this.stock;
   }

   set Stock(stock: Stock) {
      this.stock = stock;
   }

   get PriceGroup(): PriceGroup | undefined {
      return this.priceGroup;
   }

   set PriceGroup(priceGroup: PriceGroup) {
      this.priceGroup = priceGroup;
   }

   get Categories(): Category[] {
      return this.categories;
   }

   set Categories(categories: Category[]) {
      this.categories = categories;
   }

   get ReasonCategory(): ReasonCategory | undefined {
      return this.reasonCategory;
   }

   set ReasonCategory(reasonCategory: ReasonCategory) {
      this.reasonCategory = reasonCategory;
   }
}
