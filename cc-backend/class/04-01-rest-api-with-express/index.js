import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Yeah~~ Hello");
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
