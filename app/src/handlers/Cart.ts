import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Cart from "../models/Cart";

const controller = new Controller();

export async function getCarts(req: Request, res: Response) {
   try {
      const cartsResponse = await controller.read(new Cart());

      res.json(cartsResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCart(req: Request, res: Response) {
   try {
      const cart = new Cart();

      cart.Id = parseInt(req.params.id);

      const cartResponse = await controller.get(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCart(req: Request, res: Response) {
   try {
      const cart = new Cart({ ...req.body });

      const cartResponse = await controller.create(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCart(req: Request, res: Response) {
   try {
      const cart = new Cart({ ...req.body });

      cart.Id = parseInt(req.params.id);

      const cartResponse = await controller.update(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCart(req: Request, res: Response) {
   try {
      const cart = new Cart();

      cart.Id = parseInt(req.params.id);

      const cartResponse = await controller.delete(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
