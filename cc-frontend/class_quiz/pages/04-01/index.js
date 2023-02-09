import axios from "axios";

export default function QuizPage4_1() {
  const url = "https://koreanjson.com/users";

  const onClickGetData = async () => {
    const result = await axios.get(url);

    console.log(result.data);
  };

  return (
    <>
      <button onClick={onClickGetData}>GET</button>
    </>
  );
}
