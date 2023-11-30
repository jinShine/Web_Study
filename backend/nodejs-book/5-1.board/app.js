const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", {
    title: "안녕하세요",
    message: "만나서 반갑습니다.",
    layout: false,
  });
});

app.listen(3005, () => {
  console.log("Server started on port 3005");
});
