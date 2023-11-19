const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      res.statusCode = 404;
      res.end("404 page not found");
    }
  })
  .listen(8000, () => {
    console.log("라우터를 만들어보자");
  });

const user = (req, res) => {
  res.end("[user] name : andy, age: 33");
};

const feed = (req, res) => {
  res.end(`
    <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
    </ul>
  `);
};
