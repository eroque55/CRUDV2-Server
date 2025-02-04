import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Estado from "../models/Estado";

const clienteController = new ClienteController();

export async function getEstados(req: Request, res: Response) {
   try {
      const estadosResponse = await clienteController.consultar(new Estado());

      res.json(estadosResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getEstado(req: Request, res: Response) {
   try {
      const estado = new Estado();

      estado.Id = parseInt(req.params.id);

      const estadoResponse = await clienteController.selecionar(estado);
      res.json(estadoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postEstado(req: Request, res: Response) {
   try {
      const estado = new Estado();

      estado.Nome = req.body._nome;
      estado.PaisId = req.body._paisId;

      const estadoResponse = await clienteController.salvar(estado);
      res.json(estadoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putEstado(req: Request, res: Response) {
   try {
      const estado = new Estado();

      estado.Id = parseInt(req.params.id);
      estado.Nome = req.body._nome;
      estado.PaisId = req.body._paisId;

      const estadoResponse = await clienteController.alterar(estado);
      res.json(estadoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteEstado(req: Request, res: Response) {
   try {
      const estado = new Estado();

      estado.Id = parseInt(req.params.id);

      const estadoResponse = await clienteController.excluir(estado);
      res.json(estadoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
