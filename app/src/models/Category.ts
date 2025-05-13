import BookToCategory from "./BookToCategory";
import DomainEntity from "./DomainEntity";

class Category extends DomainEntity {
   name?: string;
   slug?: string;
   bookToCategory: BookToCategory[] = [];

   constructor(data?: Partial<Category>) {
      super();
      Object.assign(this, data);
   }
}

export default Category;
