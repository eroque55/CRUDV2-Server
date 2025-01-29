import { Router } from "express";
import {
   getPaises,
   getPais,
   postPais,
   putPais,
   deletePais,
} from "../handlers/Pais";

const router = Router();

router.get("/", getPaises);

router.get("/:id", getPais);

router.post("/", postPais);

router.put("/:id", putPais);

router.delete("/:id", deletePais);

export default router;
