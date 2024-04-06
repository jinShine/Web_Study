import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Videos() {
  const [text, setText] = useState("");
  const navigate = useNavigate(); // 동적으로 이동하는 방법!, 아니면 Link 사용하면 됨

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    navigate(`/videos/${text}`);
  };

  return (
    <div>
      Videos
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="'video id:" value={text} onChange={handleChange} />
      </form>
    </div>
  );
}
