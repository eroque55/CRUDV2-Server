import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import State from "../models/State";

const customerController = new CustomerController();

export async function getStates(req: Request, res: Response) {
   try {
      const statesResponse = await customerController.read(new State());

      res.json(statesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getState(req: Request, res: Response) {
   try {
      const state = new State();

      state.Id = parseInt(req.params.id);

      const stateResponse = await customerController.get(state);
      res.json(stateResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postState(req: Request, res: Response) {
   try {
      const state = new State();

      state.Name = req.body._name;
      state.Country.Id = req.body.contryId;

      const stateResponse = await customerController.create(state);
      res.json(stateResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putState(req: Request, res: Response) {
   try {
      const state = new State();

      state.Id = parseInt(req.params.id);
      state.Name = req.body.name;
      state.Country.Id = req.body.contryId;

      const stateResponse = await customerController.update(state);
      res.json(stateResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteState(req: Request, res: Response) {
   try {
      const state = new State();

      state.Id = parseInt(req.params.id);

      const response = await customerController.delete(state);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
