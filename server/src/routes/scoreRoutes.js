import { Router } from "express";
import { submitScore, getLeaderboard } from "../controllers/scoreController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/leaderboard", getLeaderboard);
router.post("/", requireAuth, submitScore);

export default router;
