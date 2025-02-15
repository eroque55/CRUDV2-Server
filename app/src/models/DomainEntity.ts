export default class DomainEntity {
   private id: number = 0;

   get Id(): number {
      return this.id;
   }

   set Id(id: number) {
      this.id = id;
   }
}
