import { Router } from "express";
import {
   getEnderecos,
   getEndereco,
   postEndereco,
   putEndereco,
   deleteEndereco,
} from "../handlers/Endereco";

const router = Router();

router.get("/", getEnderecos);

router.get("/:id", getEndereco);

router.post("/", postEndereco);

router.put("/:id", putEndereco);

router.delete("/:id", deleteEndereco);

export default router;
