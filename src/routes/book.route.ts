import { Router } from "express";
import { BookController } from "../controllers/book.controller";

const router = Router();
const bookController = new BookController();

router.post("/create-book", bookController.createBook);
router.get("/get-books", bookController.getBooks)
router.get("/get-books-recommendation", bookController.getBooksRecommendation)
router.delete("/delete-book/:id", bookController.deleteBook)

export default router;