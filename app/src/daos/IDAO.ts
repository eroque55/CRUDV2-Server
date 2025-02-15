import { PrismaClient } from "@prisma/client";

export default interface IDAO {
   create(entity: PrismaClient): Promise<PrismaClient>;
   read(entity: PrismaClient): Promise<PrismaClient[]>;
   update(entity: PrismaClient): Promise<PrismaClient>;
   delete(entity: PrismaClient): Promise<void>;
   get(entity: PrismaClient): Promise<PrismaClient>;
}
