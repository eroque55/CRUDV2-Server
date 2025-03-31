import DomainEntity from "../models/DomainEntity";

interface IDAO {
   create(entity: DomainEntity): Promise<DomainEntity>;
   read(entity: DomainEntity): Promise<DomainEntity[]>;
   update(entity: DomainEntity): Promise<DomainEntity>;
   delete(entity: DomainEntity): Promise<void>;
   get(entity: DomainEntity): Promise<DomainEntity>;
}

export default IDAO;
