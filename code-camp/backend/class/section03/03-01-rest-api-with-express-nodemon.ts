import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hellow world");
});

app.listen(3005, () => {
  console.log("서버가 켜졌어요!");
});
