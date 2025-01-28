import { Request, Response, Router } from "express";
import ClienteController from "../controllers/ClienteController";
import Cartao from "../models/Cartao";

const router = Router();

router.get("/", getCartoes);

router.get("/:id", getCartao);

async function getCartoes(req: Request, res: Response) {
   try {
      const cartoesResponse = await new ClienteController().consultar(
         new Cartao()
      );
      res.send(cartoesResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

async function getCartao(req: Request, res: Response) {
   try {
      const cartao = new Cartao();
      cartao.Id = parseInt(req.params.id);
      const cartaoResponse = await new ClienteController().selecionar(cartao);
      res.send(cartaoResponse);
   } catch (error: any) {
      res.status(500).send(error.message);
   }
}

export default router;
