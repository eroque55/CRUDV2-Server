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
      customer.Id = parseInt(req.params.id);

      cart.Customer = customer;

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

      customer.Id = Number(req.body.customer.id);
      book.Id = Number(req.body.bookToCart[0].book.id);
      bookToCart.Book = book;

      cart.Customer = customer;
      cart.BookToCart.push(bookToCart);

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
            Id: item.bookId,
         });
         const bookToCart = new BookToCartModel({
            Amount: item.amount,
            Book: book,
         });
         cart.BookToCart.push(bookToCart);
      });

      cart.Id = parseInt(req.body.id);
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
