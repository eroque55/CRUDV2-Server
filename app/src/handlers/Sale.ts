import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Sale from "../models/Sale";
import Freight from "../models/Freight";
import Carrier from "../models/Carrier";
import Address from "../models/Address";
import Card from "../models/Card";
import CardToSale from "../models/CardToSale";
import Cart from "../models/Cart";

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
      const carrier = new Carrier();
      carrier.Id = req.body.freight?.carrier?.id;

      const address = new Address();
      address.Id = req.body.freight?.address?.id;

      const freight = new Freight();
      freight.Carrier = carrier;
      freight.Address = address;

      const card = new Card();
      card.Id = req.body.cardToSales[0].card.id;

      const cardToSale = new CardToSale();
      cardToSale.Card = card;

      const cart = new Cart();
      cart.Id = req.body.cart.id;

      const sale = new Sale();
      sale.TotalValue = req.body.totalValue;
      sale.PaymentMethod = req.body.paymentMethod;
      sale.Freight = freight;
      sale.CardsToSales = [cardToSale];
      sale.Cart = cart;

      console.log(sale);

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
