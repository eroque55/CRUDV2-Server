import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import City from "../models/City";

const customerController = new CustomerController();

export async function getCities(req: Request, res: Response) {
   try {
      const citiesResponse = await customerController.read(new City());

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

      city.Name = req.body._name;
      city.StateId = req.body._stateId;

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
      city.Name = req.body._name;
      city.StateId = req.body._stateId;

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
