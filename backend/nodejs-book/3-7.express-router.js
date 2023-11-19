const url = require("url");
const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Start server : use ${port}`);
});

app.get("/", (req, res) => {});
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  const userInfo = url.parse(req.url, true).query;
  res.json(`[user] name : ${userInfo.name}`);
}

function feed(req, res) {
  res.json(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>`);
}
