import { StockMovementType } from "@prisma/client";
import DomainEntity from "./DomainEntity";
import Stock from "./Stock";

export default class StockMovement extends DomainEntity {
   private movementType?: StockMovementType;
   private amount?: number;
   private cost?: number;
   private supplier?: string;
   private createdAt?: Date;

   private stock?: Stock;

   constructor(data?: Partial<StockMovement>) {
      super();
      Object.assign(this, data);
   }

   get MovementType(): StockMovementType | undefined {
      return this.movementType;
   }

   set MovementType(movementType: StockMovementType) {
      this.movementType = movementType;
   }

   get Amount(): number | undefined {
      return this.amount;
   }

   set Amount(amount: number) {
      this.amount = amount;
   }

   get Cost(): number | undefined {
      return this.cost;
   }

   set Cost(cost: number) {
      this.cost = cost;
   }

   get Supplier(): string | undefined {
      return this.supplier;
   }

   set Supplier(supplier: string) {
      this.supplier = supplier;
   }

   get CreatedAt(): Date | undefined {
      return this.createdAt;
   }

   set CreatedAt(createdAt: Date) {
      this.createdAt = createdAt;
   }

   get Stock(): Stock | undefined {
      return this.stock;
   }

   set Stock(stock: Stock) {
      this.stock = stock;
   }
}
