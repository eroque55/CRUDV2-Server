import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Cidade from "../models/Cidade";

const clienteController = new ClienteController();

export async function getCidades(req: Request, res: Response) {
   try {
      const cidadesResponse = await clienteController.consultar(new Cidade());

      res.json(cidadesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCidade(req: Request, res: Response) {
   try {
      const cidade = new Cidade();

      cidade.Id = parseInt(req.params.id);

      const cidadeResponse = await clienteController.selecionar(cidade);
      res.json(cidadeResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCidade(req: Request, res: Response) {
   try {
      const cidade = new Cidade();

      cidade.Nome = req.body.nome;
      cidade.EstadoId = req.body.estadoId;

      const cidadeResponse = await clienteController.salvar(cidade);
      res.json(cidadeResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCidade(req: Request, res: Response) {
   try {
      const cidade = new Cidade();

      cidade.Id = parseInt(req.body.id);
      cidade.Nome = req.body.nome;
      cidade.EstadoId = req.body.estadoId;

      const cidadeResponse = await clienteController.alterar(cidade);
      res.json(cidadeResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCidade(req: Request, res: Response) {
   try {
      const cidade = new Cidade();

      cidade.Id = parseInt(req.params.id);

      const cidadeResponse = await clienteController.excluir(cidade);
      res.json(cidadeResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
