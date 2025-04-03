import BookToCategory from "./BookToCategory";
import DomainEntity from "./DomainEntity";

class Category extends DomainEntity {
   private name?: string;
   private slug?: string;
   private bookToCategory: BookToCategory[] = [];

   constructor(data?: Partial<Category>) {
      super();
      Object.assign(this, data);
   }

   get Name(): string | undefined {
      return this.name;
   }

   set Name(name: string) {
      this.name = name;
   }

   get Slug(): string | undefined {
      return this.slug;
   }

   set Slug(slug: string) {
      this.slug = slug;
   }

   get BookToCategory(): BookToCategory[] {
      return this.bookToCategory;
   }

   set BookToCategory(bookToCategory: BookToCategory[]) {
      this.bookToCategory = bookToCategory;
   }
}

export default Category;
