import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/boards", (req, res) => {
  res.send("Hellow world");
});

app.post("/tokens/phone", (req, res) => {
  console.log(req.body);
  res.send("인증코드 발송완료");
});

app.listen(3000);
