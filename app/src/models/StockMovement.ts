import { StockMovementType } from "@prisma/client";
import DomainEntity from "./DomainEntity";
import Stock from "./Stock";

export default class StockMovement extends DomainEntity {
   movementType?: StockMovementType;
   amount?: number;
   cost?: number;
   supplier?: string;
   createdAt?: Date;

   stock?: Stock;

   constructor(data?: Partial<StockMovement>) {
      super();
      Object.assign(this, data);
   }
}
