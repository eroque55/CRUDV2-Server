import { Router } from "express";
import {
   getAddresses,
   getAddress,
   postAddress,
   putAddress,
   deleteAddress,
   getAddressesByCustomer,
} from "../handlers/Address";

const router = Router();

router.get("/", getAddresses);

router.get("/:id", getAddress);

router.get("/customer/:customerId", getAddressesByCustomer);

router.post("/", postAddress);

router.put("/:id", putAddress);

router.delete("/:id", deleteAddress);

export default router;
