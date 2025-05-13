import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import Card from "../models/Card";

const controller = new Controller();

export async function getCards(req: Request, res: Response) {
   try {
      const cardsResponse = await controller.read(new Card());

      res.json(cardsResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.id = parseInt(req.params.id);

      const cardResponse = await controller.get(card);
      res.json(cardResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCard(req: Request, res: Response) {
   try {
      const card = new Card({ ...req.body });

      const cardResponse = await controller.create(card);
      res.json(cardResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.id = parseInt(req.params.id);

      const cardResponse = await controller.update(card);
      res.json(cardResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.id = parseInt(req.params.id);

      const response = await controller.delete(card);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
