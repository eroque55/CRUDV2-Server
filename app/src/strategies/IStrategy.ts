import { PrismaClient } from "@prisma/client/scripts/default-index";

export default interface IStrategy {
   execute(entity: PrismaClient): string;
}
