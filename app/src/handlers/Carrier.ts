import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Carrier from "../models/Carrier";

const controller = new Controller();

export async function getCarriers(req: Request, res: Response) {
   try {
      const carriersResponse = await controller.read(new Carrier());

      res.json(carriersResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCarrier(req: Request, res: Response) {
   try {
      const carrier = new Carrier();

      carrier.id = parseInt(req.params.id);

      const carrierResponse = await controller.get(carrier);
      res.json(carrierResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCarrier(req: Request, res: Response) {
   try {
      const carrier = new Carrier({ ...req.body });

      const carrierResponse = await controller.create(carrier);
      res.json(carrierResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCarrier(req: Request, res: Response) {
   try {
      const carrier = new Carrier({ ...req.body });

      carrier.id = parseInt(req.params.id);

      const carrierResponse = await controller.update(carrier);
      res.json(carrierResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCarrier(req: Request, res: Response) {
   try {
      const carrier = new Carrier();

      carrier.id = parseInt(req.params.id);

      const carrierResponse = await controller.delete(carrier);
      res.json(carrierResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
