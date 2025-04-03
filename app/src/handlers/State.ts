import { Request, Response } from "express";
import Controller from "../controllers/Controller";

import State from "../models/State";

const controller = new Controller();

export async function getStates(req: Request, res: Response) {
   try {
      const statesResponse = await controller.read(new State());

      res.json(statesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getState(req: Request, res: Response) {
   try {
      const state = new State();

      state.Id = parseInt(req.params.id);

      const stateResponse = await controller.get(state);
      res.json(stateResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postState(req: Request, res: Response) {
   try {
      const state = new State({ ...req.body });

      const stateResponse = await controller.create(state);
      res.json(stateResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putState(req: Request, res: Response) {
   try {
      const state = new State({ ...req.body });

      state.Id = parseInt(req.params.id);

      const stateResponse = await controller.update(state);
      res.json(stateResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteState(req: Request, res: Response) {
   try {
      const state = new State();

      state.Id = parseInt(req.params.id);

      const response = await controller.delete(state);
      res.json(response);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
