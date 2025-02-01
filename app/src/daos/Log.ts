import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default class LogDAO {
   async salvar(
      entidade: string,
      usuario: string,
      dataHora: Date
   ): Promise<boolean> {
      try {
         await prisma.log.create({
            data: {
               entidade,
               usuario,
               dataHora,
            },
         });
         return true;
      } catch (error) {
         return false;
      }
   }
}
