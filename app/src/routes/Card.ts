import { Router } from "express";
import {
   getCards,
   getCard,
   postCard,
   putCard,
   deleteCard,
} from "../handlers/Card";

const router = Router();

router.get("/", getCards);

router.get("/:id", getCard);

router.post("/", postCard);

router.put("/:id", putCard);

router.delete("/:id", deleteCard);

export default router;
