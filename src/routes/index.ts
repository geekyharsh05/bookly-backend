import { Router } from "express";
import AuthRoutes from "./auth.route"
import UserRoutes from "./book.route"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;