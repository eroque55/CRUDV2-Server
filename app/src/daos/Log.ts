import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class Log {
   async create(entity: string, user: string): Promise<boolean> {
      try {
         await prisma.log.create({
            data: {
               entity,
               user,
            },
         });
         return true;
      } catch (error) {
         return false;
      }
   }
}
