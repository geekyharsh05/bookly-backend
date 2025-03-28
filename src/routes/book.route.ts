import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { BookController } from "../controllers/book.controller";

const router = Router();
const bookController = new BookController();

router.post("/create-book", isAuthenticated, bookController.createBook);
router.get("/get-books", isAuthenticated, bookController.getBooks)
router.delete("/delete-book", isAuthenticated, bookController.deleteBook)

export default router;