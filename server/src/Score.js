import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    durationSeconds: {
      type: Number, // total time to complete the round, for stats/analytics
    },
  },
  { timestamps: true }
);

// Leaderboard query: highest scores first, oldest-first as a tiebreak
scoreSchema.index({ points: -1, createdAt: 1 });

export default mongoose.model("Score", scoreSchema);
