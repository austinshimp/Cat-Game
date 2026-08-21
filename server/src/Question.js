import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length === 4,
        message: "Each question needs exactly 4 answer options.",
      },
    },
    correctOptionIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
      required: true,
    },
    relatedCat: {
      type: Schema.Types.ObjectId,
      ref: "Cat", // optional — set when the question is about a specific cat
    },
    explanation: {
      type: String, // shown to the player after they answer
    },
  },
  { timestamps: true }
);

// Speeds up "give me N random questions at this difficulty" queries
questionSchema.index({ difficulty: 1 });

export default mongoose.model("Question", questionSchema);
