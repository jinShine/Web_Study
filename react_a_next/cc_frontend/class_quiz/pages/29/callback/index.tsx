import axios from "axios";
import { useState } from "react";

interface IResult {
  id: number;
  title: string;
}

export default function CallbackPage() {
  const [resultData, setResultData] = useState<IResult[]>([]);

  const onClickCallback = () => {
    const http = new XMLHttpRequest();
    http.open("get", "http://numbersapi.com/random?min=1&max=200");
    http.send();
    http.addEventListener("load", (res: ProgressEvent<XMLHttpRequestEventTarget>) => {
      const randomNum = res.target.response.split(" ")[0];

      const http = new XMLHttpRequest();
      http.open("get", `https://koreanjson.com/posts/${randomNum}`);
      http.send();
      http.addEventListener("load", (res: ProgressEvent<XMLHttpRequestEventTarget>) => {
        const userId = JSON.parse(res.target.response).UserId;

        const http = new XMLHttpRequest();
        http.open("get", `https://koreanjson.com/posts?userId=${userId}`);
        http.send();
        http.addEventListener("load", (res: ProgressEvent<XMLHttpRequestEventTarget>) => {
          setResultData(JSON.parse(res.target.response));
        });
      });
    });
  };

  const onClickPromise = () => {
    axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => {
        const randomNum = res.data.split(" ")[0];
        return axios.get(`https://koreanjson.com/posts/${randomNum}`);
      })
      .then((res) => {
        const userId = res.data.UserId;
        return axios.get(`https://koreanjson.com/posts?userId=${userId}`);
      })
      .then((res) => setResultData(res.data));
  };

  const onClickAsyncAwait = async () => {
    const randomNum = await axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => res.data.split(" ")[0]);
    const userId = await axios
      .get(`https://koreanjson.com/posts/${randomNum}`)
      .then((res) => res.data.UserId);
    const result = await axios
      .get(`https://koreanjson.com/posts?userId=${userId}`)
      .then((res) => res.data);

    setResultData(result);
  };

  return (
    <>
      <div>
        결과 : <button onClick={onClickCallback}>Callback</button>
      </div>
      <div>
        결과 : <button onClick={onClickPromise}>Promise</button>
      </div>
      <div>
        결과 : <button onClick={onClickAsyncAwait}>Async/Await</button>
      </div>
      <div>
        {resultData?.map((el) => (
          <div key={el.id} style={{ border: "1px solid black", height: "30px", margin: "3px" }}>
            <span>{el.id} : </span>
            <span>{el.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}
