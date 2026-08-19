import { Cat } from "../index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllCats = asyncHandler(async (req, res) => {
  const cats = await Cat.find().sort({ commonName: 1 });
  return res.json({ cats });
});

export const getCatById = asyncHandler(async (req, res) => {
  const cat = await Cat.findById(req.params.id);
  if (!cat) {
    return res.status(404).json({ message: "Cat not found." });
  }
  return res.json({ cat });
});

export const createCat = asyncHandler(async (req, res) => {
  const cat = new Cat(req.body);
  await cat.save();
  return res.status(201).json({ cat });
});

export const updateCat = asyncHandler(async (req, res) => {
  const cat = await Cat.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the updated doc, not the pre-update one
    runValidators: true, // re-run schema validation on the update
  });
  if (!cat) {
    return res.status(404).json({ message: "Cat not found." });
  }
  return res.json({ cat });
});

export const deleteCat = asyncHandler(async (req, res) => {
  const cat = await Cat.findByIdAndDelete(req.params.id);
  if (!cat) {
    return res.status(404).json({ message: "Cat not found." });
  }
  return res.json({ message: "Cat deleted." });
});
