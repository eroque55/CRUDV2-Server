import IFacade from "./IFacade";
import IStrategy from "../strategies/IStrategy";
import DomainEntity from "../models/DomainEntity";
import IDAO from "../daos/IDAO";

import * as Models from "../models";
import * as DAOs from "../daos";
import * as Strategies from "../strategies";

export default class Facade implements IFacade {
   private strategies: Map<string, IStrategy[]> = new Map();
   private daos: Map<string, IDAO> = new Map();

   constructor() {
      this.setStrategies();
      this.setDAOs();
   }

   async create(entity: DomainEntity): Promise<DomainEntity> {
      const dao = this.getDAO(entity);
      const msg: string = this.execute(entity);

      if (msg) {
         throw new Error(msg);
      }

      const logDAO: DAOs.LogDao = new DAOs.LogDao();
      logDAO.create(`${entity.constructor.name}.create`, "admin");

      return await dao.create(entity);
   }

   async update(entity: DomainEntity): Promise<DomainEntity> {
      const dao = this.getDAO(entity);
      const updatedEntity = await dao.update(entity);

      if (updatedEntity) {
         const logDAO: DAOs.LogDao = new DAOs.LogDao();
         logDAO.create(`${entity.constructor.name}.update`, "admin");
      }

      return updatedEntity;
   }

   async delete(entity: DomainEntity): Promise<void> {
      const dao = this.getDAO(entity);
      await dao.delete(entity);
      const logDAO: DAOs.LogDao = new DAOs.LogDao();
      logDAO.create(`${entity.constructor.name}.delete`, "admin");
   }

   async read(entity: DomainEntity): Promise<DomainEntity[]> {
      const dao = this.getDAO(entity);
      return await dao.read(entity);
   }

   async get(entity: DomainEntity): Promise<DomainEntity> {
      const dao = this.getDAO(entity);
      return await dao.get(entity);
   }

   private setStrategies(): void {
      this.strategies.set(Models.CardModel.name, [
         new Strategies.ValidateCard(),
      ]);
      this.strategies.set(Models.CustomerModel.name, [
         new Strategies.ValidateCustomer(),
         new Strategies.ValidateCPF(),
      ]);
      this.strategies.set(Models.AddressModel.name, [
         new Strategies.ValidateAddress(),
      ]);
      this.strategies.set(Models.PhoneModel.name, [
         new Strategies.ValidatePhone(),
      ]);
   }

   private setDAOs(): void {
      this.daos.set(Models.CardModel.name, new DAOs.CardDao());
      this.daos.set(Models.CustomerModel.name, new DAOs.CustomerDao());
      this.daos.set(Models.PhoneModel.name, new DAOs.PhoneDao());
      this.daos.set(Models.AddressModel.name, new DAOs.AddressDao());
      this.daos.set(Models.CountryModel.name, new DAOs.CountryDAO());
      this.daos.set(Models.StateModel.name, new DAOs.StateDao());
      this.daos.set(Models.CityModel.name, new DAOs.CityDao());
   }

   private execute(entity: DomainEntity): string {
      const className: string = entity.constructor.name;
      const entityStrategies: IStrategy[] =
         this.strategies.get(className) || [];
      let msg: string = "";

      entityStrategies.forEach((strategy) => (msg += strategy.execute(entity)));

      return msg;
   }

   private getDAO(entity: DomainEntity): IDAO {
      const className = entity.constructor.name;
      const dao = this.daos.get(className);

      if (!dao) {
         throw new Error(`DAO não encontrada para a classe: ${className}`);
      }

      return dao;
   }
}
