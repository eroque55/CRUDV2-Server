import { PrismaClient, Prisma } from "@prisma/client";
import Abstract from "./Abstract";

export default class Customer<T> extends Abstract {
   create(entity: T): Promise<T> {
      return this.facade.create(entity);
   }
   read(entity: T): Promise<T[]> {
      return this.facade.read(entity);
   }
   update(entity: T): Promise<T> {
      return this.facade.update(entity);
   }
   delete(entity: T): Promise<void> {
      return this.facade.delete(entity);
   }
   get(entity: T): Promise<T> {
      return this.facade.get(entity);
   }
}
