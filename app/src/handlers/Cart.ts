import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Cart from "../models/Cart";
import Customer from "../models/Customer";
import { BookToCartModel } from "../models";
import Book from "../models/Book";

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
      const customer = new Customer();
      customer.id = parseInt(req.params.id);

      cart.customer = customer;

      const cartResponse = await controller.get(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCart(req: Request, res: Response) {
   try {
      const cart = new Cart();
      const customer = new Customer();
      const book = new Book();
      const bookToCart = new BookToCartModel();

      customer.id = Number(req.body.customer.id);
      book.id = Number(req.body.bookToCart[0].book.id);
      bookToCart.book = book;

      cart.customer = customer;
      cart.bookToCart.push(bookToCart);

      const cartResponse = await controller.create(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCart(req: Request, res: Response) {
   try {
      const cart = new Cart();

      req.body.bookToCart.map((item: any) => {
         const book = new Book({
            id: item.bookId,
         });
         const bookToCart = new BookToCartModel({
            amount: item.amount,
            book: book,
         });
         cart.bookToCart.push(bookToCart);
      });

      cart.id = parseInt(req.body.id);
      const cartResponse = await controller.update(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCart(req: Request, res: Response) {
   try {
      const cart = new Cart();

      cart.id = parseInt(req.params.id);

      const cartResponse = await controller.delete(cart);
      res.json(cartResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
