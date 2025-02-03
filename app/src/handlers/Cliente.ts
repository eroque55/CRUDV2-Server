import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Cliente from "../models/Cliente";
import Genero from "../enums/Genero";

const clienteController = new ClienteController();

export async function getClientes(req: Request, res: Response) {
   try {
      const clientesResponse = await clienteController.consultar(new Cliente());

      res.json(clientesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCliente(req: Request, res: Response) {
   try {
      const cliente = new Cliente();

      cliente.Id = parseInt(req.params.id);

      const clienteResponse = await clienteController.selecionar(cliente);
      res.json(clienteResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCliente(req: Request, res: Response) {
   try {
      const cliente = new Cliente();

      cliente.Nome = req.body._nome;
      cliente.DataNascimento = new Date(req.body._dataNascimento);
      cliente.Cpf = req.body._cpf;
      cliente.Email = req.body._email;
      cliente.Senha = req.body._senha;
      cliente.ConfirmacaoSenha = req.body._confirmacaoSenha;
      cliente.Genero = Genero[req.body._genero as keyof typeof Genero];

      const clienteResponse = await clienteController.salvar(cliente);
      res.json(clienteResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCliente(req: Request, res: Response) {
   try {
      const cliente = new Cliente();

      cliente.Id = req.body._id;
      cliente.Nome = req.body._nome;
      cliente.DataNascimento = new Date(req.body._dataNascimento);
      cliente.Cpf = req.body._cpf;
      cliente.Email = req.body._email;
      cliente.Genero = Genero[req.body._genero as keyof typeof Genero];
      cliente.Status = req.body._status;
      cliente.Ranking = req.body._ranking;

      const clienteResponse = await clienteController.alterar(cliente);
      res.json(clienteResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCliente(req: Request, res: Response) {
   try {
      const cliente = new Cliente();

      cliente.Id = parseInt(req.params.id);

      const clienteResponse = await clienteController.excluir(cliente);
      res.json(clienteResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
