import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import Card from "../models/Card";
import CardBrand from "../enums/CardBrand";
import { CardDao } from "../daos";

const customerController = new CustomerController();
const cardDao = new CardDao();

export async function getCards(req: Request, res: Response) {
   try {
      const cardsResponse = await customerController.read(new Card());

      res.json(cardsResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.Id = parseInt(req.params.id);

      const cardResponse = await customerController.get(card);
      res.json(cardResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCardsByCustomer(req: Request, res: Response) {
   try {
      const card = new Card();

      card.CustomerId = parseInt(req.params.customerId);

      const cardsResponse = await cardDao.getByCustomer(card);
      res.json(cardsResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.CustomerId = req.body.customerId;
      card.Number = req.body.number;
      card.CardHolder = req.body.cardholder;
      card.Cvv = req.body.cvv;
      card.ExpirationDate = req.body.expirationDate;
      card.CardBrand = CardBrand[req.body.cardBrand as keyof typeof CardBrand];

      const cardResponse = await customerController.create(card);
      res.json(cardResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.Id = parseInt(req.params.id);
      card.Preferential = req.body.preferential;

      const cardResponse = await customerController.update(card);
      res.json(cardResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCard(req: Request, res: Response) {
   try {
      const card = new Card();

      card.Id = parseInt(req.params.id);

      const response = await customerController.delete(card);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
