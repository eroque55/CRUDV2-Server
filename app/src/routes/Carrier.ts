import { Router } from "express";
import {
   getCarriers,
   getCarrier,
   postCarrier,
   putCarrier,
   deleteCarrier,
} from "../handlers/Carrier";

const router = Router();

router.get("/", getCarriers);

router.get("/:id", getCarrier);

router.post("/", postCarrier);

router.put("/:id", putCarrier);

router.delete("/:id", deleteCarrier);

export default router;
