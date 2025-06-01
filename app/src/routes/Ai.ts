import { Router } from "express";
import { generateResponse } from "../handlers/Ai";

const router = Router();

router.post("/", generateResponse);

export default router;
