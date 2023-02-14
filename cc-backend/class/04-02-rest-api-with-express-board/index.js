import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/boards", (req, res) => {
  // 1. 데이터를 조회하는 로직 즉, DB에 접속해서 데이터 꺼내오기
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목입니다",
      content: "내용이에용요ㅛ요요요요요요용",
    },
    {
      number: 2,
      writer: "철수2",
      title: "제목입니다",
      content: "내용이에용요ㅛ요요요요요요용",
    },
    {
      number: 3,
      writer: "철수3",
      title: "제목입니다",
      content: "내용이에용요ㅛ요요요요요요용",
    },
  ];

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/boards", (req, res) => {
  // 1. 데이터를 동록하는 로직
  console.log(req.body);

  // 2. 저장 결과 응답 주기
  res.send("게시물 등록에 성공 하였습니다.");
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
