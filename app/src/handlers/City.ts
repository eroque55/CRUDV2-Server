import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import City from "../models/City";
import { CityDao } from "../daos";

const customerController = new CustomerController();
const cityDao = new CityDao();

export async function getCities(req: Request, res: Response) {
   try {
      const citiesResponse = await customerController.read(new City());

      res.json(citiesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCitiesByState(req: Request, res: Response) {
   try {
      const city = new City();

      city.State.Id = parseInt(req.params.stateId);

      const citiesResponse = await cityDao.getByState(city);
      res.json(citiesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCity(req: Request, res: Response) {
   try {
      const city = new City();

      city.Id = parseInt(req.params.id);

      const cityResponse = await customerController.get(city);
      res.json(cityResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCity(req: Request, res: Response) {
   try {
      const city = new City();

      city.Name = req.body.name;
      city.State.Id = req.body.stateId;

      const cityResponse = await customerController.create(city);
      res.json(cityResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCity(req: Request, res: Response) {
   try {
      const city = new City();

      city.Id = parseInt(req.params.id);
      city.Name = req.body.name;
      city.State.Id = req.body.stateId;

      const cityResponse = await customerController.update(city);
      res.json(cityResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCity(req: Request, res: Response) {
   try {
      const city = new City();

      city.Id = parseInt(req.params.id);

      const response = await customerController.delete(city);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
