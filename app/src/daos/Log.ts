import prisma from "./prisma";

export default class LogDao {
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
