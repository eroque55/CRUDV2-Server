import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import Address from "../models/Address";

const customerController = new CustomerController();

export async function getAddresses(req: Request, res: Response) {
   try {
      const addressesResponse = await customerController.read(new Address());

      res.json(addressesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getAddress(req: Request, res: Response) {
   try {
      const address = new Address();

      address.Id = parseInt(req.params.id);

      const addressResponse = await customerController.get(address);
      res.json(addressResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postAddress(req: Request, res: Response) {
   try {
      const address = new Address({ ...req.body });

      const addressResponse = await customerController.create(address);
      res.json(addressResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putAddress(req: Request, res: Response) {
   try {
      const address = new Address({ ...req.body });

      address.Id = parseInt(req.params.id);

      const addressResponse = await customerController.update(address);
      res.json(addressResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteAddress(req: Request, res: Response) {
   try {
      const address = new Address();

      address.Id = parseInt(req.params.id);

      const addressResponse = await customerController.delete(address);
      res.json(addressResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
