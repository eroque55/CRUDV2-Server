import { Request, Response } from "express";
import ClienteController from "../controllers/ClienteController";

import Cartao from "../models/Cartao";
import BandeiraCartao from "../enums/BandeiraCartao";

const clienteController = new ClienteController();

export async function getCartoes(req: Request, res: Response) {
   try {
      const cartoesResponse = await clienteController.consultar(new Cartao());

      res.json(cartoesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function getCartao(req: Request, res: Response) {
   try {
      const cartao = new Cartao();

      cartao.Id = parseInt(req.params.id);

      const cartaoResponse = await clienteController.selecionar(cartao);
      res.json(cartaoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function postCartao(req: Request, res: Response) {
   try {
      const cartao = new Cartao();

      cartao.ClienteId = req.body._clienteId;
      cartao.Numero = req.body._numero;
      cartao.NomeImpresso = req.body._nomeImpresso;
      cartao.Cvv = req.body._cvv;
      cartao.Validade = req.body._validade;
      cartao.BandeiraCartao =
         BandeiraCartao[
            req.body._bandeiraCartao as keyof typeof BandeiraCartao
         ];

      const cartaoResponse = await clienteController.salvar(cartao);
      res.json(cartaoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function putCartao(req: Request, res: Response) {
   try {
      const cartao = new Cartao();

      cartao.Id = parseInt(req.params.id);
      cartao.Preferencial = req.body._preferencial;

      const cartaoResponse = await clienteController.alterar(cartao);
      res.json(cartaoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export async function deleteCartao(req: Request, res: Response) {
   try {
      const cartao = new Cartao();

      cartao.Id = parseInt(req.params.id);

      const cartaoResponse = await clienteController.excluir(cartao);
      res.json(cartaoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}
