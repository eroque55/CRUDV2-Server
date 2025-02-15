import IFacade from "./IFacade";
import IStrategy from "../strategies/IStrategy";
import IDAO from "../daos/IDAO";

import { PrismaClient, Prisma } from "@prisma/client";

import * as DAOs from "../daos";
import * as Strategies from "../strategies";

export default class Facade implements IFacade {
   private strategies: Map<string, IStrategy[]> = new Map();
   private daos: Map<string, IDAO> = new Map();

   constructor() {
      this.setStrategies();
      this.setDAOs();
   }

   async create(entity: PrismaClient): Promise<PrismaClient> {
      const dao = this.getDAO(entity);
      const msg: string = this.execute(entity);

      if (msg) {
         throw new Error(msg);
      }

      const logDAO: DAOs.LogDao = new DAOs.LogDao();
      logDAO.create(`${PrismaClient.name}.create`, "admin");

      return await dao.create(entity);
   }

   async update(entity: PrismaClient): Promise<PrismaClient> {
      const dao = this.getDAO(entity);
      const updatedEntity = await dao.update(entity);

      if (updatedEntity) {
         const logDAO: DAOs.LogDao = new DAOs.LogDao();
         logDAO.create(`${entity.constructor.name}.update`, "admin");
      }

      return updatedEntity;
   }

   async delete(entity: PrismaClient): Promise<void> {
      const dao = this.getDAO(entity);
      await dao.delete(entity);
      const logDAO: DAOs.LogDao = new DAOs.LogDao();
      logDAO.create(`${entity.constructor.name}.delete`, "admin");
   }

   async read(entity: PrismaClient): Promise<PrismaClient[]> {
      const dao = this.getDAO(entity);
      return await dao.read(entity);
   }

   async get(entity: PrismaClient): Promise<PrismaClient> {
      const dao = this.getDAO(entity);
      return await dao.get(entity);
   }

   private setStrategies(): void {
      this.strategies.set(Prisma.ModelName.Card, [
         new Strategies.ValidateCard(),
      ]);
      this.strategies.set(Prisma.ModelName.Customer, [
         new Strategies.ValidateCustomer(),
         new Strategies.ValidateCPF(),
      ]);
      this.strategies.set(Prisma.ModelName.Address, [
         new Strategies.ValidateAddress(),
      ]);
      this.strategies.set(Prisma.ModelName.Phone, [
         new Strategies.ValidatePhone(),
      ]);
   }

   private setDAOs(): void {
      this.daos.set(Prisma.ModelName.Card, new DAOs.CardDao());
      this.daos.set(Prisma.ModelName.Customer, new DAOs.CustomerDao());
      this.daos.set(Prisma.ModelName.Phone, new DAOs.PhoneDao());
      this.daos.set(Prisma.ModelName.Address, new DAOs.AddressDao());
      this.daos.set(Prisma.ModelName.Country, new DAOs.CountryDAO());
      this.daos.set(Prisma.ModelName.State, new DAOs.StateDao());
      this.daos.set(Prisma.ModelName.State, new DAOs.CityDao());
   }

   private execute(entity: PrismaClient): string {
      const className: string = entity.constructor.name;
      const entityStrategies: IStrategy[] =
         this.strategies.get(className) || [];
      let msg: string = "";

      entityStrategies.forEach((strategy) => (msg += strategy.execute(entity)));

      return msg;
   }

   private getDAO(entity: PrismaClient): IDAO {
      const className = entity.constructor.name;
      const dao = this.daos.get(className);

      if (!dao) {
         throw new Error(`DAO não encontrada para a classe: ${className}`);
      }

      return dao;
   }
}
