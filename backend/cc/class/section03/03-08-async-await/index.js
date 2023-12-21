import axios from "axios";

console.log(123);

function fetch1() {
  const res = axios.get("https://koreanjson.com/posts/1");
  console.log("@@@@@@@@1", res.data);
}
fetch1();

async function fetch2() {
  const res = await axios.get("https://koreanjson.com/posts/1");
  console.log("@@@@@@@@2", res.data);
}
fetch2();
