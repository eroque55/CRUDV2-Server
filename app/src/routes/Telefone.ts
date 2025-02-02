import { Router } from "express";
import {
   getTelefones,
   getTelefone,
   postTelefone,
   putTelefone,
   deleteTelefone,
} from "../handlers/Telefone";

const router = Router();

router.get("/", getTelefones);

router.get("/:id", getTelefone);

router.post("/", postTelefone);

router.put("/", putTelefone);

router.delete("/", deleteTelefone);

export default router;
