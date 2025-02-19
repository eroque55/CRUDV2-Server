import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import Country from "../models/Country";

const customerController = new CustomerController();

export async function getCountries(req: Request, res: Response) {
   try {
      const countriesResponse = await customerController.read(new Country());

      res.json(countriesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCountry(req: Request, res: Response) {
   try {
      const contry = new Country();

      contry.Id = parseInt(req.params.id);

      const countryResponse = await customerController.get(contry);
      res.json(countryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCountry(req: Request, res: Response) {
   try {
      const country = new Country({ ...req.body });

      const countryResponse = await customerController.create(country);
      res.json(countryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCountry(req: Request, res: Response) {
   try {
      const country = new Country({ ...req.body });

      country.Id = parseInt(req.params.id);

      const countryResponse = await customerController.update(country);
      res.json(countryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCountry(req: Request, res: Response) {
   try {
      const country = new Country();

      country.Id = parseInt(req.params.id);

      const response = await customerController.delete(country);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
