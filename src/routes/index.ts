import { Router } from "express";
import AuthRoutes from "./auth.route"
import BookRoutes from "./book.route"
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/book", isAuthenticated, BookRoutes);

export default router;