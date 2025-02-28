import Address from "./Address";
import Carrier from "./Carrier";
import DomainEntity from "./DomainEntity";

export default class Freight extends DomainEntity {
   private deliveryTime?: number;

   private address?: Address;
   private carrier?: Carrier;

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
}
