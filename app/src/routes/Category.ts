import { Router } from "express";
import {
   getCategories,
   getCategory,
   postCategory,
   putCategory,
   deleteCategory,
} from "../handlers/Category";

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post("/", postCategory);

router.put("/:id", putCategory);

router.delete("/:id", deleteCategory);

export default router;
