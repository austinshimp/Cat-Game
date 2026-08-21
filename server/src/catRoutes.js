import { Router } from "express";
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from "../controllers/catController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// Public — the field guide / trivia content is meant to be browsed freely.
router.get("/", getAllCats);
router.get("/:id", getCatById);

// Content management is restricted to developer-role accounts.
router.post("/", requireAuth, requireRole("developer"), createCat);
router.put("/:id", requireAuth, requireRole("developer"), updateCat);
router.delete("/:id", requireAuth, requireRole("developer"), deleteCat);

export default router;
