import { Router } from "express";
import {
   getCarts,
   getCart,
   postCart,
   putCart,
   deleteCart,
} from "../handlers/Cart";

const router = Router();

router.get("/", getCarts);

router.get("/:id", getCart);

router.post("/", postCart);

router.put("/:id", putCart);

router.delete("/:id", deleteCart);

export default router;
