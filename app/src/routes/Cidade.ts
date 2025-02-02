import { Router } from "express";
import {
   getCidades,
   getCidade,
   postCidade,
   putCidade,
   deleteCidade,
} from "../handlers/Cidade";

const router = Router();

router.get("/", getCidades);

router.get("/:id", getCidade);

router.post("/", postCidade);

router.put("/", putCidade);

router.delete("/", deleteCidade);

export default router;
