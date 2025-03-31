class DomainEntity {
   private id?: number;

   constructor(data?: Partial<DomainEntity>) {
      Object.assign(this, data);
   }

   get Id(): number | undefined {
      return this.id;
   }

   set Id(id: number) {
      this.id = id;
   }
}

export default DomainEntity;
