import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Book from "../models/Book";
import Category from "../models/Category";
import BookToCategory from "../models/BookToCategory";

const controller = new Controller();

export async function getBooks(req: Request, res: Response) {
   try {
      const book = new Book();

      const categorySlug = req.query.slug;
      const category = new Category();
      category.slug = String(categorySlug);
      const bookToCategory = new BookToCategory();
      bookToCategory.category = category;
      book.bookToCategory = [bookToCategory];
      book.title = String(req.query.title);

      const booksResponse = await controller.read(book);

      res.json(booksResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getBook(req: Request, res: Response) {
   try {
      const book = new Book();
      book.slug = req.params.slug;

      const bookResponse = await controller.get(book);
      res.json(bookResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postBook(req: Request, res: Response) {
   try {
      const book = new Book({ ...req.body });

      const bookResponse = await controller.create(book);
      res.json(bookResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putBook(req: Request, res: Response) {
   try {
      const book = new Book({ ...req.body });

      book.id = parseInt(req.params.id);

      const bookResponse = await controller.update(book);
      res.json(bookResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteBook(req: Request, res: Response) {
   try {
      const book = new Book();

      book.id = parseInt(req.params.id);

      const bookResponse = await controller.delete(book);
      res.json(bookResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
