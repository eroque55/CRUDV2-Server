import DomainEntity from "../models/DomainEntity";

export default interface IFacade {
   create(entidade: DomainEntity): Promise<DomainEntity>;
   update(entidade: DomainEntity): Promise<DomainEntity>;
   delete(entidade: DomainEntity): Promise<void>;
   read(entidade: DomainEntity): Promise<DomainEntity[]>;
   get(entidade: DomainEntity): Promise<DomainEntity>;
}
