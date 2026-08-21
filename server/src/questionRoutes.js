import { Router } from "express";
import {
  getRandomQuestions,
  checkAnswer,
  createQuestion,
} from "../controllers/questionController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/random", getRandomQuestions);
router.post("/:id/answer", checkAnswer);

router.post("/", requireAuth, requireRole("developer"), createQuestion);

export default router;
