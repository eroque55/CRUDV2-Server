import { Router } from "express";
import {
   getCountries,
   getCountry,
   postCountry,
   putCountry,
   deleteCountry,
} from "../handlers/Country";

const router = Router();

router.get("/", getCountries);

router.get("/:id", getCountry);

router.post("/", postCountry);

router.put("/:id", putCountry);

router.delete("/:id", deleteCountry);

export default router;
