import { Score, User } from "../index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

// POST /api/scores  (requires auth)
export const submitScore = asyncHandler(async (req, res) => {
  const { points, correctAnswers, totalQuestions, difficulty, durationSeconds } =
    req.body;

  if (
    typeof points !== "number" ||
    typeof correctAnswers !== "number" ||
    typeof totalQuestions !== "number" ||
    !VALID_DIFFICULTIES.includes(difficulty)
  ) {
    return res.status(400).json({
      message:
        "points, correctAnswers, totalQuestions (numbers) and difficulty are required.",
    });
  }

  const score = await Score.create({
    user: req.user.id,
    points,
    correctAnswers,
    totalQuestions,
    difficulty,
    durationSeconds,
  });

  // $max/$inc are atomic on Mongo's side, so two rounds finishing at the
  // same moment can't stomp on each other the way a read-then-write would.
  await User.findByIdAndUpdate(req.user.id, {
    $max: { highScore: points },
    $inc: { gamesPlayed: 1 },
  });

  return res.status(201).json({ score });
});

// GET /api/scores/leaderboard?limit=10
export const getLeaderboard = asyncHandler(async (req, res) => {
  const limit = Math.min(
    Math.max(parseInt(req.query.limit, 10) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );

  const scores = await Score.find()
    .sort({ points: -1, createdAt: 1 }) // matches the Score schema's index
    .limit(limit)
    .populate("user", "username");

  return res.json({ scores });
});
