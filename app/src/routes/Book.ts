import { Router } from "express";
import {
   getBooks,
   getBook,
   postBook,
   putBook,
   deleteBook,
} from "../handlers/Book";

const router = Router();

router.get("/", getBooks);

router.get("/:id", getBook);

router.post("/", postBook);

router.put("/:id", putBook);

router.delete("/:id", deleteBook);

export default router;
