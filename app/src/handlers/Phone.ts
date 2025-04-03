import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Phone from "../models/Phone";

const controller = new Controller();

export async function getPhones(req: Request, res: Response) {
   try {
      const phonesResponse = await controller.read(new Phone());

      res.json(phonesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getPhone(req: Request, res: Response) {
   try {
      const phone = new Phone();

      phone.Id = parseInt(req.params.id);

      const phoneResponse = await controller.get(phone);
      res.json(phoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postPhone(req: Request, res: Response) {
   try {
      const phone = new Phone({ ...req.body });

      const phoneResponse = await controller.create(phone);
      res.json(phoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putPhone(req: Request, res: Response) {
   try {
      const phone = new Phone({ ...req.body });

      phone.Id = parseInt(req.params.id);

      const phoneResponse = await controller.update(phone);
      res.json(phoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deletePhone(req: Request, res: Response) {
   try {
      const phone = new Phone();

      phone.Id = parseInt(req.params.id);

      const response = await controller.delete(phone);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
