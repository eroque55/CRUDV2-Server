import { PrismaClient } from "@prisma/client";

export default interface IFacade {
   create(entidade: PrismaClient): Promise<PrismaClient>;
   update(entidade: PrismaClient): Promise<PrismaClient>;
   delete(entidade: PrismaClient): Promise<void>;
   read(entidade: PrismaClient): Promise<PrismaClient[]>;
   get(entidade: PrismaClient): Promise<PrismaClient>;
}
