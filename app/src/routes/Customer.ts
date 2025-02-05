import { Router } from "express";
import {
   getCustomers,
   getCustomer,
   postCustomer,
   putCustomer,
   deleteCustomer,
} from "../handlers/Customer";

const router = Router();

router.get("/", getCustomers);

router.get("/:id", getCustomer);

router.post("/", postCustomer);

router.put("/:id", putCustomer);

router.delete("/:id", deleteCustomer);

export default router;
