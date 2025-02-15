import DomainEntity from "../models/DomainEntity";

export default interface IFacade {
   create(entity: DomainEntity): Promise<DomainEntity>;
   update(entity: DomainEntity): Promise<DomainEntity>;
   delete(entity: DomainEntity): Promise<void>;
   read(entity: DomainEntity): Promise<DomainEntity[]>;
   get(entity: DomainEntity): Promise<DomainEntity>;
}
