import Abstract from "./Abstract";
import DomainEntity from "../models/DomainEntity";

export default class Customer extends Abstract {
   create(entity: DomainEntity): Promise<DomainEntity> {
      return this.facade.create(entity);
   }
   read(entity: DomainEntity): Promise<DomainEntity[]> {
      return this.facade.read(entity);
   }
   update(entity: DomainEntity): Promise<DomainEntity> {
      return this.facade.update(entity);
   }
   delete(entity: DomainEntity): Promise<void> {
      return this.facade.delete(entity);
   }
   get(entity: DomainEntity): Promise<DomainEntity> {
      return this.facade.get(entity);
   }
}
