import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import Phone from "../models/Phone";
import PhoneType from "../enums/PhoneType";

const customerController = new CustomerController();

export async function getPhones(req: Request, res: Response) {
   try {
      const phonesResponse = await customerController.read(new Phone());

      res.json(phonesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getPhone(req: Request, res: Response) {
   try {
      const phone = new Phone();

      phone.Id = parseInt(req.params.id);

      const phoneResponse = await customerController.get(phone);
      res.json(phoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postPhone(req: Request, res: Response) {
   try {
      const phone = new Phone();

      phone.CustomerId = req.body._customerId;
      phone.Ddd = req.body._ddd;
      phone.Number = req.body._number;
      phone.PhoneType =
         PhoneType[req.body._phoneType as keyof typeof PhoneType];

      const phoneResponse = await customerController.create(phone);
      res.json(phoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putPhone(req: Request, res: Response) {
   try {
      const phone = new Phone();

      phone.Id = parseInt(req.params.id);
      phone.Ddd = req.body._ddd;
      phone.Number = req.body._number;
      phone.PhoneType =
         PhoneType[req.body._phoneType as keyof typeof PhoneType];

      const phoneResponse = await customerController.update(phone);
      res.json(phoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deletePhone(req: Request, res: Response) {
   try {
      const phone = new Phone();

      phone.Id = parseInt(req.params.id);

      const response = await customerController.delete(phone);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
