import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Book from "../models/Book";
import Category from "../models/Category";
import BookToCategory from "../models/BookToCategory";

const controller = new Controller();

export async function getBooks(req: Request, res: Response) {
   try {
      const book = new Book();

      if (req.query.categorySlug) {
         const categorySlug = req.query.categorySlug as string;
         const category = new Category();
         category.Slug = categorySlug;
         const bookToCategory = new BookToCategory();
         bookToCategory.Category = category;
         book.BookToCategory = [bookToCategory];
      }

      const booksResponse = await controller.read(book);

      res.json(booksResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getBook(req: Request, res: Response) {
   try {
      const book = new Book();

      book.Id = parseInt(req.params.id);

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

      book.Id = parseInt(req.params.id);

      const bookResponse = await controller.update(book);
      res.json(bookResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteBook(req: Request, res: Response) {
   try {
      const book = new Book();

      book.Id = parseInt(req.params.id);

      const bookResponse = await controller.delete(book);
      res.json(bookResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
