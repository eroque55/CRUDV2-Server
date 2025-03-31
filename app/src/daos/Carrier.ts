import prisma from "./prisma";
import IDAO from "./IDAO";
import { CarrierModel, DomainEntityModel } from "../models";

class CarrierDao implements IDAO {
   create(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   async read(entity: CarrierModel): Promise<DomainEntityModel[]> {
      try {
         const carriers = await prisma.carrier.findMany({
            orderBy: { name: "asc" },
         });

         return carriers.map(this.mapToDomain);
      } catch (error: any) {
         throw new Error(`Erro ao consultar transportadoras: ${error.message}`);
      }
   }
   update(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }
   delete(entity: DomainEntityModel): Promise<void> {
      throw new Error("TODO");
   }
   get(entity: DomainEntityModel): Promise<DomainEntityModel> {
      throw new Error("TODO");
   }

   private mapToDomain(carrier: any): CarrierModel {
      if (!carrier) throw new Error(`Trasnportadora inválida para mapeamento`);
      return { ...carrier };
   }
}

export default CarrierDao;
