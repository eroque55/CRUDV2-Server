import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Sale from "../models/Sale";

const controller = new Controller();

export async function getSales(req: Request, res: Response) {
   try {
      const salesResponse = await controller.read(new Sale());

      res.json(salesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getSale(req: Request, res: Response) {
   try {
      const sale = new Sale();

      sale.Id = parseInt(req.params.id);

      const saleResponse = await controller.get(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postSale(req: Request, res: Response) {
   try {
      const sale = new Sale({ ...req.body });

      const saleResponse = await controller.create(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putSale(req: Request, res: Response) {
   try {
      const sale = new Sale({ ...req.body });

      sale.Id = parseInt(req.params.id);

      const saleResponse = await controller.update(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteSale(req: Request, res: Response) {
   try {
      const sale = new Sale();

      sale.Id = parseInt(req.params.id);

      const saleResponse = await controller.delete(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
