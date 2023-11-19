const http = require("http");

let count = 0;

// 노드 서버 객체 생성
const server = http.createServer((req, res) => {
  console.log((count += 1));
  res.statusCod = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello");

  setTimeout(() => {
    res.end("Node.js");
  }, 2000);
});

server.listen(8000, () => {});
