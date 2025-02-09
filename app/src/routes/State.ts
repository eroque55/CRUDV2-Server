import { Router } from "express";
import {
   getStates,
   getStatesByContry,
   getState,
   postState,
   putState,
   deleteState,
} from "../handlers/State";

const router = Router();

router.get("/", getStates);

router.get("/:id", getState);

router.get("/country/:countryId", getStatesByContry);

router.post("/", postState);

router.put("/:id", putState);

router.delete("/:id", deleteState);

export default router;
