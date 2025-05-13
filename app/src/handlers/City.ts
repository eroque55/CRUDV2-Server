import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import City from "../models/City";

const controller = new Controller();

export async function getCities(req: Request, res: Response) {
   try {
      const citiesResponse = await controller.read(new City());

      res.json(citiesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCity(req: Request, res: Response) {
   try {
      const city = new City();

      city.id = parseInt(req.params.id);

      const cityResponse = await controller.get(city);
      res.json(cityResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCity(req: Request, res: Response) {
   try {
      const city = new City({ ...req.body });

      const cityResponse = await controller.create(city);
      res.json(cityResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCity(req: Request, res: Response) {
   try {
      const city = new City({ ...req.body });

      city.id = parseInt(req.params.id);

      const cityResponse = await controller.update(city);
      res.json(cityResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCity(req: Request, res: Response) {
   try {
      const city = new City();

      city.id = parseInt(req.params.id);

      const response = await controller.delete(city);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
