import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Telefone from "../models/Telefone";
import TipoTelefone from "../enums/TipoTelefone";

const clienteController = new ClienteController();

export async function getTelefones(req: Request, res: Response) {
   try {
      const telefonesResponse = await clienteController.consultar(
         new Telefone()
      );

      res.json(telefonesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getTelefone(req: Request, res: Response) {
   try {
      const telefone = new Telefone();

      telefone.Id = parseInt(req.params.id);

      const telefoneResponse = await clienteController.selecionar(telefone);
      res.json(telefoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postTelefone(req: Request, res: Response) {
   try {
      const telefone = new Telefone();

      telefone.ClienteId = req.body._clienteId;
      telefone.Ddd = req.body._ddd;
      telefone.Numero = req.body._numero;
      telefone.Tipo = TipoTelefone[req.body._tipo as keyof typeof TipoTelefone];

      const telefoneResponse = await clienteController.salvar(telefone);
      res.json(telefoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putTelefone(req: Request, res: Response) {
   try {
      const telefone = new Telefone();

      telefone.Id = req.body._id;
      telefone.Ddd = req.body._ddd;
      telefone.Numero = req.body._numero;
      telefone.Tipo = TipoTelefone[req.body._tipo as keyof typeof TipoTelefone];

      const telefoneResponse = await clienteController.alterar(telefone);
      res.json(telefoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteTelefone(req: Request, res: Response) {
   try {
      const telefone = new Telefone();

      telefone.Id = parseInt(req.params.id);

      const telefoneResponse = await clienteController.excluir(telefone);
      res.json(telefoneResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
