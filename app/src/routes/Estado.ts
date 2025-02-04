import { Router } from "express";
import {
   getEstados,
   getEstado,
   postEstado,
   putEstado,
   deleteEstado,
} from "../handlers/Estado";

const router = Router();

router.get("/", getEstados);

router.get("/:id", getEstado);

router.post("/", postEstado);

router.put("/:id", putEstado);

router.delete("/:id", deleteEstado);

export default router;
