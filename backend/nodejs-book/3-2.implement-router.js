const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (path === "/user") {
    res.end("[user] name : andy, age: 33");
  } else if (path === "/feed") {
    res.end(`
      <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
      </ul>
    `);
  } else {
    res.statusCode = 404;
    res.end("404 page not found");
  }
});

server.listen(8000, () => {
  console.log("라우터를 만들어보자");
});
