import { Router } from "express";
import {
   getStates,
   getState,
   postState,
   putState,
   deleteState,
} from "../handlers/State";

const router = Router();

router.get("/", getStates);

router.get("/:id", getState);

router.post("/", postState);

router.put("/:id", putState);

router.delete("/:id", deleteState);

export default router;
