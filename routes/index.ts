import { Router } from "express";
import userRoutes from "./userRoutes";
// import inventoryRoutes from "./inventoryRoutes";

const router = Router();

router.use("/api/users", userRoutes);
// router.use("/api", inventoryRoutes);

export default router;
