import { Request, Response } from "express";
import CustomerController from "../controllers/Controller";

import Category from "../models/Category";

const controller = new CustomerController();

export async function getCategories(req: Request, res: Response) {
   try {
      const categoriesResponse = await controller.read(new Category());

      res.json(categoriesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCategory(req: Request, res: Response) {
   try {
      const category = new Category();

      category.Id = parseInt(req.params.id);

      const categoryResponse = await controller.get(category);
      res.json(categoryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCategory(req: Request, res: Response) {
   try {
      const category = new Category({ ...req.body });

      const categoryResponse = await controller.create(category);
      res.json(categoryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCategory(req: Request, res: Response) {
   try {
      const category = new Category({ ...req.body });

      category.Id = parseInt(req.params.id);

      const categoryResponse = await controller.update(category);
      res.json(categoryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCategory(req: Request, res: Response) {
   try {
      const category = new Category();

      category.Id = parseInt(req.params.id);

      const categoryResponse = await controller.delete(category);
      res.json(categoryResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
