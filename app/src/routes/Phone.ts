import { Router } from "express";
import {
   getPhones,
   getPhone,
   postPhone,
   putPhone,
   deletePhone,
   getPhoneByCustomer,
} from "../handlers/Phone";

const router = Router();

router.get("/", getPhones);

router.get("/:id", getPhone);

router.get("/customer/:customerId", getPhoneByCustomer);

router.post("/", postPhone);

router.put("/:id", putPhone);

router.delete("/:id", deletePhone);

export default router;
