import Address from "./Address";
import Carrier from "./Carrier";
import DomainEntity from "./DomainEntity";
import Sale from "./Sale";

class Freight extends DomainEntity {
   private deliveryTime?: number;
   private address?: Address;
   private carrier?: Carrier;

   private sales: Sale[] = [];

   constructor(data?: Partial<Freight>) {
      super();
      Object.assign(this, data);
   }

   get DeliveryTime(): number | undefined {
      return this.deliveryTime;
   }

   set DeliveryTime(deliveryTime: number) {
      this.deliveryTime = deliveryTime;
   }

   get Address(): Address | undefined {
      return this.address;
   }

   set Address(address: Address) {
      this.address = address;
   }

   get Carrier(): Carrier | undefined {
      return this.carrier;
   }

   set Carrier(carrier: Carrier) {
      this.carrier = carrier;
   }

   get Sales(): Sale[] {
      return this.sales;
   }

   set Sales(sales: Sale[]) {
      this.sales = sales;
   }
}

export default Freight;
