import { Router } from "express";
import AuthRoutes from "./auth.route"
import BookRoutes from "./book.route"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/book", BookRoutes);

export default router;