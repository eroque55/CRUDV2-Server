import { Router } from "express";
import {
   getClientes,
   getCliente,
   postCliente,
   putCliente,
   deleteCliente,
} from "../handlers/Cliente";

const router = Router();

router.get("/", getClientes);

router.get("/:id", getCliente);

router.post("/", postCliente);

router.put("/", putCliente);

router.delete("/", deleteCliente);

export default router;
