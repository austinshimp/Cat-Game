import mongoose from "mongoose";

const { Schema } = mongoose;

const catSchema = new Schema(
  {
    commonName: {
      type: String,
      required: true,
      trim: true, // e.g. "Siberian Tiger"
    },
    scientificName: {
      type: String,
      required: true,
      trim: true, // e.g. "Panthera tigris altaica"
    },
    description: {
      type: String,
      required: true,
    },
    habitat: {
      type: String,
    },
    diet: {
      type: String,
    },
    conservationStatus: {
      type: String,
      enum: [
        "Least Concern",
        "Near Threatened",
        "Vulnerable",
        "Endangered",
        "Critically Endangered",
      ],
    },
    funFacts: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String },
      },
    ],
  },
  { timestamps: true }
);

catSchema.index({ commonName: 1 });

export default mongoose.model("Cat", catSchema);
