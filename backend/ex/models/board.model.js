import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: String,
  writer: String,
  contents: String,
});

export const Board = mongoose.model("Board", boardSchema);
