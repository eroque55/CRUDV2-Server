import BookDimension from "./BookDimension";
import BookToCategory from "./BookToCategory";
import DomainEntity from "./DomainEntity";
import PriceGroup from "./PriceGroup";
import ReasonCategory from "./ReasonCategory";
import Stock from "./Stock";

class Book extends DomainEntity {
   title?: string;
   slug?: string;
   author?: string;
   status?: boolean;
   year?: number;
   synopsis?: string;
   numberPages?: number;
   publisher?: string;
   edition?: number;
   isbn?: string;
   barcode?: string;
   inativatonReason?: string;

   bookDimension?: BookDimension;
   stock?: Stock;
   priceGroup?: PriceGroup;
   bookToCategory: BookToCategory[] = [];
   reasonCategory?: ReasonCategory;

   constructor(data?: Partial<Book>) {
      super();
      Object.assign(this, data);
   }

   get Value(): number {
      console.log(this?.priceGroup?.tax);
      const maxCost = this?.stock?.stockMovement?.reduce((max, current) =>
         Number(current.cost) > Number(max.cost) ? current : max
      ).cost;

      return Number(maxCost) + (this?.priceGroup?.tax || 0);
   }
}

export default Book;
