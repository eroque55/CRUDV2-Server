import { Router } from "express";
import {
   getPhones,
   getPhone,
   postPhone,
   putPhone,
   deletePhone,
} from "../handlers/Phone";

const router = Router();

router.get("/", getPhones);

router.get("/:id", getPhone);

router.post("/", postPhone);

router.put("/:id", putPhone);

router.delete("/:id", deletePhone);

export default router;
