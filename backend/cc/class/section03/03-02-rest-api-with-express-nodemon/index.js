import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("HOME");

  res.send("HOME");
});

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
