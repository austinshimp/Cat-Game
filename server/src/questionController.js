import mongoose from "mongoose";
import { Question } from "../index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];
const DEFAULT_COUNT = 10;
const MAX_COUNT = 50;

// GET /api/questions/random?difficulty=easy&count=10
// Returns a random batch WITHOUT correctOptionIndex or explanation —
// those would let a player read the answer straight out of devtools'
// network tab. The client checks answers via POST /:id/answer instead.
export const getRandomQuestions = asyncHandler(async (req, res) => {
  const { difficulty, count } = req.query;

  if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
    return res.status(400).json({
      message: `difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}`,
    });
  }

  const size = Math.min(
    Math.max(parseInt(count, 10) || DEFAULT_COUNT, 1),
    MAX_COUNT
  );

  const match = difficulty ? { difficulty } : {};

  const questions = await Question.aggregate([
    { $match: match },
    { $sample: { size } },
    {
      $project: {
        questionText: 1,
        options: 1,
        difficulty: 1,
        relatedCat: 1,
      },
    },
  ]);

  return res.json({ questions });
});

// POST /api/questions/:id/answer  { selectedIndex }
// Looks up the real answer server-side and reports back — this is the
// only place the correct index and explanation are ever revealed.
export const checkAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { selectedIndex } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid question id." });
  }
  if (
    typeof selectedIndex !== "number" ||
    selectedIndex < 0 ||
    selectedIndex > 3
  ) {
    return res
      .status(400)
      .json({ message: "selectedIndex must be a number between 0 and 3." });
  }

  const question = await Question.findById(id);
  if (!question) {
    return res.status(404).json({ message: "Question not found." });
  }

  const correct = selectedIndex === question.correctOptionIndex;
  return res.json({
    correct,
    correctOptionIndex: question.correctOptionIndex,
    explanation: question.explanation,
  });
});

export const createQuestion = asyncHandler(async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  return res.status(201).json({ question });
});
