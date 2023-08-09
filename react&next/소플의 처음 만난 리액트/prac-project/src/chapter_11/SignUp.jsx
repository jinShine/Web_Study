import React, { useState } from "react";

function SignUp(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("남자");

  const handleChangename = (event) => {
    setName(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    alert(`이름 : ${name}, 성별 : ${gender}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름 :
        <input type="text" value={name} onChange={handleChangename} />
      </label>
      <br />
      <select value={gender} onChange={handleChangeGender}>
        <option value="남자">남자</option>
        <option value="여자">여자</option>
      </select>
      <button type="submit">제출</button>
    </form>
  );
}

export default SignUp;
