import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  wirter: String,
  title: String,
  content: String,
});

export const Board = mongoose.model("Board", Schema);
