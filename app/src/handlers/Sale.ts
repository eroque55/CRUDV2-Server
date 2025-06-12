import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Sale from "../models/Sale";
import Freight from "../models/Freight";
import Carrier from "../models/Carrier";
import Address from "../models/Address";
import Card from "../models/Card";
import CardToSale from "../models/CardToSale";
import Cart from "../models/Cart";
import Customer from "../models/Customer";
import { SaleDao } from "../daos";

const controller = new Controller();
const saleDao = new SaleDao();

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

      if (req.params.id) {
         const customerId = Number(req.params.id);
         const customer = new Customer();
         customer.id = customerId;
         const cart = new Cart();
         cart.customer = customer;
         sale.cart = cart;
      }

      const saleResponse = await controller.read(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postSale(req: Request, res: Response) {
   try {
      const carrier = new Carrier();
      carrier.id = req.body.freight?.carrier?.id;

      const address = new Address();
      address.id = req.body.freight?.address?.id;

      const freight = new Freight();
      freight.carrier = carrier;
      freight.address = address;

      const card = new Card();
      card.id = req.body.cardToSales[0].card.id;

      const cardToSale = new CardToSale();
      cardToSale.card = card;

      const cart = new Cart();
      cart.id = req.body.cart.id;

      const sale = new Sale();
      sale.totalValue = req.body.totalValue;
      sale.paymentMethod = req.body.paymentMethod;
      sale.freight = freight;
      sale.cardsToSales = [cardToSale];
      sale.cart = cart;

      const saleResponse = await controller.create(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putSale(req: Request, res: Response) {
   try {
      const sale = new Sale();

      sale.id = parseInt(req.params.id);
      sale.status = req.body.status;

      const saleResponse = await controller.update(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteSale(req: Request, res: Response) {
   try {
      const sale = new Sale();

      sale.id = parseInt(req.params.id);

      const saleResponse = await controller.delete(sale);
      res.json(saleResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getSalesByCategory(req: Request, res: Response) {
   try {
      const now = new Date();

      const from = req.query.from
         ? new Date(req.query.from as string)
         : new Date(new Date().setFullYear(now.getFullYear() - 1));

      const to = req.query.to ? new Date(req.query.to as string) : now;

      const salesResponse = await saleDao.getByCategory(from, to);

      res.json(salesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
