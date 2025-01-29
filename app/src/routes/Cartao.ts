import { Router } from "express";
import {
   getCartoes,
   getCartao,
   postCartao,
   putCartao,
   deleteCartao,
} from "../handlers/Cartao";

const router = Router();

router.get("/", getCartoes);

router.get("/:id", getCartao);

router.post("/", postCartao);

router.put("/:id", putCartao);

router.delete("/:id", deleteCartao);

export default router;
