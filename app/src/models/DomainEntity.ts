class DomainEntity {
   id?: number;

   constructor(data?: Partial<DomainEntity>) {
      Object.assign(this, data);
   }
}

export default DomainEntity;
