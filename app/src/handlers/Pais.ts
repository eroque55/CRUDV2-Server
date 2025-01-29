import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Pais from "../models/Pais";

const clienteController = new ClienteController();

export async function getPaises(req: Request, res: Response) {
   try {
      const paisesResponse = await clienteController.consultar(new Pais());

      res.send(paisesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getPais(req: Request, res: Response) {
   try {
      const pais = new Pais();

      pais.Id = parseInt(req.params.id);

      const paisResponse = await clienteController.selecionar(pais);
      res.send(paisResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postPais(req: Request, res: Response) {
   try {
      const pais = new Pais();

      pais.Nome = req.body.nome;

      const paisResponse = await clienteController.salvar(pais);
      res.send(paisResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putPais(req: Request, res: Response) {
   try {
      const pais = new Pais();

      pais.Id = parseInt(req.body.id);
      pais.Nome = req.body.nome;

      const paisResponse = await clienteController.alterar(pais);
      res.send(paisResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deletePais(req: Request, res: Response) {
   try {
      const pais = new Pais();

      pais.Id = parseInt(req.params.id);

      const paisResponse = await clienteController.excluir(pais);
      res.send(paisResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
