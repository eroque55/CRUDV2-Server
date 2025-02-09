import { Request, Response } from "express";
import CustomerController from "../controllers/Customer";

import State from "../models/State";
import { StateDao } from "../daos";

const customerController = new CustomerController();
const stateDao = new StateDao();

export async function getStates(req: Request, res: Response) {
   try {
      const statesResponse = await customerController.read(new State());

      res.json(statesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getStatesByContry(req: Request, res: Response) {
   try {
      const state = new State();

      state.CountryId = parseInt(req.params.countryId);

      const statesResponse = await stateDao.getByContry(state);
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
      state.CountryId = req.body._contryId;

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
      state.Name = req.body._name;
      state.CountryId = req.body._contryId;

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
