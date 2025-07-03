import { Router } from "express";
import {
   getSales,
   getSale,
   postSale,
   putSale,
   deleteSale,
   getSalesByCategory,
   acceptTrade,
} from "../handlers/Sale";

const router = Router();

router.get("/", getSales);

router.get("/byCategory", getSalesByCategory);

router.get("/customer/:id", getSale);

router.post("/", postSale);

router.put("/:id", putSale);

router.delete("/:id", deleteSale);

router.put("/acceptTrade/:id", acceptTrade);

export default router;
