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

      res.json(enderecosResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.Id = parseInt(req.params.id);

      const enderecoResponse = await clienteController.selecionar(endereco);
      res.json(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.ClienteId = req.body._clienteId;
      endereco.Apelido = req.body._apelido;
      endereco.Logradouro = req.body._logradouro;
      endereco.Numero = req.body._numero;
      endereco.Bairro = req.body._bairro;
      endereco.Cep = req.body._cep;
      endereco.Observacoes = req.body._observacoes;
      endereco.CidadeId = req.body._cidadeId;
      endereco.TipoEndereco =
         TipoEndereco[req.body._tipoEndereco as keyof typeof TipoEndereco];
      endereco.TipoLogradouro =
         TipoLogradouro[
            req.body._tipoLogradouro as keyof typeof TipoLogradouro
         ];
      endereco.TipoResidencia =
         TipoResidencia[
            req.body._tipoResidencia as keyof typeof TipoResidencia
         ];

      const enderecoResponse = await clienteController.salvar(endereco);
      res.json(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.Id = req.body._id;
      endereco.Apelido = req.body._apelido;
      endereco.Logradouro = req.body._logradouro;
      endereco.Numero = req.body._numero;
      endereco.Bairro = req.body._bairro;
      endereco.Cep = req.body._cep;
      endereco.Observacoes = req.body._observacoes;
      endereco.CidadeId = req.body._cidadeId;
      endereco.TipoLogradouro =
         TipoLogradouro[
            req.body._tipoLogradouro as keyof typeof TipoLogradouro
         ];
      endereco.TipoResidencia =
         TipoResidencia[
            req.body._tipoResidencia as keyof typeof TipoResidencia
         ];

      const enderecoResponse = await clienteController.alterar(endereco);
      res.json(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteEndereco(req: Request, res: Response) {
   try {
      const endereco = new Endereco();

      endereco.Id = parseInt(req.params.id);

      const enderecoResponse = await clienteController.excluir(endereco);
      res.json(enderecoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
