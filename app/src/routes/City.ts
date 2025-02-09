import { Router } from "express";
import {
   getCities,
   getCitiesByState,
   getCity,
   postCity,
   putCity,
   deleteCity,
} from "../handlers/City";

const router = Router();

router.get("/", getCities);

router.get("/:id", getCity);

router.get("/state/:stateId", getCitiesByState);

router.post("/", postCity);

router.put("/:id", putCity);

router.delete("/:id", deleteCity);

export default router;
