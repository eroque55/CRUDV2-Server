import { Router } from "express";
import {
   getCards,
   getCard,
   postCard,
   putCard,
   deleteCard,
   getCardsByCustomer,
} from "../handlers/Card";

const router = Router();

router.get("/", getCards);

router.get("/:id", getCard);

router.get("/customer/:customerId", getCardsByCustomer);

router.post("/", postCard);

router.put("/:id", putCard);

router.delete("/:id", deleteCard);

export default router;
