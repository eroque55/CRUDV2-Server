import IDAO from "./IDAO";
import { DomainEntityModel } from "../models";

class CategoryDao implements IDAO {
   create(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   read(entity: DomainEntityModel): Promise<DomainEntityModel[]> {
      throw new Error("TODO");
   }
   update(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   delete(entity: DomainEntityModel): Promise<void> {
      throw new Error("TODO");
   }
   get(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
}

export default CategoryDao;
