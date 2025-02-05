import { Router } from "express";
import {
   getCities,
   getCity,
   postCity,
   putCity,
   deleteCity,
} from "../handlers/City";

const router = Router();

router.get("/", getCities);

router.get("/:id", getCity);

router.post("/", postCity);

router.put("/:id", putCity);

router.delete("/:id", deleteCity);

export default router;
