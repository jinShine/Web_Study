import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

import mongoose from "mongoose";

import { Board } from "./models/board.model.js";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.use(express.json()); // to support JSON-encoded bodies
app.use(cors({}));

app.get("/boards", async (req, res) => {
  const result = await Board.find();

  res.send(result);
});

app.post("/boards", async (req, res) => {
  const { title, writer, contents } = req.body;

  const board = new Board({
    title,
    writer,
    contents,
  });

  await board.save();

  res.send({
    data: board,
    message: "게시글 등록에 성공하였습니다.",
  });
});

mongoose.set("debug", true);
mongoose
  .connect("mongodb://test-mongodb/app")
  .then(() => console.log("db 접속에 성공했습니다."))
  .catch(() => console.log("db 접속에 실패 했습니다."));

app.listen(3002, () => {
  console.log("Example app listening on port 3002!");
});
