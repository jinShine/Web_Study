import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  content: String,
});

export const Board = mongoose.model("Board", boardSchema);
