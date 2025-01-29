import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Endereco from "../models/Endereco";
import TipoEndereco from "../enums/TipoEndereco";
import TipoLogradouro from "../enums/TipoLogradouro";
import TipoResidencia from "../enums/TipoResidencia";

const clienteController = new ClienteController();

export async function getEnderecos(req: Request, res: Response) {
   try {
      const enderecosResponse = await clienteController.consultar(
         new Endereco()
      );

      res.send(enderecosResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.Id = parseInt(req.params.id);

      const enderecoResponse = await clienteController.selecionar(endereco);
      res.send(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.ClienteId = req.body.clienteId;
      endereco.Apelido = req.body.apelido;
      endereco.Logradouro = req.body.logradouro;
      endereco.Numero = req.body.numero;
      endereco.Bairro = req.body.bairro;
      endereco.Cep = req.body.cep;
      endereco.Observacoes = req.body.observacoes;
      endereco.CidadeId = req.body.cidadeId;
      endereco.TipoEndereco =
         TipoEndereco[req.body.tipoEndereco as keyof typeof TipoEndereco];
      endereco.TipoLogradouro =
         TipoLogradouro[req.body.tipoLogradouro as keyof typeof TipoLogradouro];
      endereco.TipoResidencia =
         TipoResidencia[req.body.tipoResidencia as keyof typeof TipoResidencia];

      const enderecoResponse = await clienteController.salvar(endereco);
      res.send(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.Id = parseInt(req.params.id);
      endereco.Apelido = req.body.apelido;
      endereco.Logradouro = req.body.logradouro;
      endereco.Numero = req.body.numero;
      endereco.Bairro = req.body.bairro;
      endereco.Cep = req.body.cep;
      endereco.Observacoes = req.body.observacoes;
      endereco.CidadeId = req.body.cidadeId;
      endereco.TipoLogradouro =
         TipoLogradouro[req.body.tipoLogradouro as keyof typeof TipoLogradouro];
      endereco.TipoResidencia =
         TipoResidencia[req.body.tipoResidencia as keyof typeof TipoResidencia];

      const enderecoResponse = await clienteController.alterar(endereco);
      res.send(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.Id = parseInt(req.params.id);

      const enderecoResponse = await clienteController.excluir(endereco);
      res.send(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
