const express = require("express");

const app = express();
const port = 3001;

// req.body를 사용하려면 JSON미들웨어를 사용.
// 사용하지 않으면 undefined로 나옴
app.use(express.json());

// POST 요청 시 컨텐트 타입이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true })); // JSON 미들웨어와 함께 사용

app.listen(port, () => {
  console.log(`Start server : use ${port}`);
});

let posts = [];

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;

  posts.push({ id: posts.length + 1, title, name, text, createAt: Date() });
  res.json({ title, name, text });
});

app.delete("/post/:id", (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== Number(id));
  const isLengthChanged = filteredPosts.length !== posts.length;

  posts = filteredPosts;
  if (isLengthChanged) {
    res.json("OK");
    return;
  }

  res.json("Not changed");
});
