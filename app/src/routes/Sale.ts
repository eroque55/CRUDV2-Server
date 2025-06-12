import { Router } from "express";
import {
   getSales,
   getSale,
   postSale,
   putSale,
   deleteSale,
   getSalesByCategory,
} from "../handlers/Sale";

const router = Router();

router.get("/", getSales);

router.get("/byCategory", getSalesByCategory);

router.get("/customer/:id", getSale);

router.post("/", postSale);

router.put("/:id", putSale);

router.delete("/:id", deleteSale);

export default router;
