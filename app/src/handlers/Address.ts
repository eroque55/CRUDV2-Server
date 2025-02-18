import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import Address from "../models/Address";
import { AddressType, ResidenceType, StreetType } from "@prisma/client";

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
      const address = new Address();

      address.Customer.Id = req.body.customer.id;
      address.Nickname = req.body.nickname;
      address.Street = req.body.street;
      address.Number = req.body.number;
      address.Neighborhood = req.body.neighborhood;
      address.Cep = req.body.cep;
      address.Complement = req.body.complement;
      address.City = req.body.city;
      address.AddressType = req.body.addressType as AddressType;
      address.StreetType = req.body.streetType as StreetType;
      address.ResidenceType = req.body.residenceType as ResidenceType;

      const addressResponse = await customerController.create(address);
      res.json(addressResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putAddress(req: Request, res: Response) {
   try {
      const address = new Address();

      address.Id = parseInt(req.params.id);
      address.Nickname = req.body.nickname;
      address.Street = req.body.street;
      address.Number = req.body.number;
      address.Neighborhood = req.body.neighborhood;
      address.Cep = req.body.cep;
      address.Complement = req.body.complement;
      address.City = req.body.city;
      address.StreetType = req.body.streetType as StreetType;
      address.ResidenceType = req.body.residenceType as ResidenceType;

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
