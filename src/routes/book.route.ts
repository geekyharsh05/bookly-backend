import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { BookController } from "../controllers/book.controller";

const router = Router();
const bookController = new BookController();

router.post("/create-book", isAuthenticated, bookController.createBook);
router.get("/get-book", isAuthenticated)
router.get("/get-books", isAuthenticated, bookController.getBooks)
router.put("/update-book", isAuthenticated)
router.delete("/delete-book", isAuthenticated)

export default router;