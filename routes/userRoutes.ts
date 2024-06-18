import { Router } from "express";
import {
  register,
  login,
  update,
  remove,
  getAll,
  getById,
} from "../controllers/userController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;
