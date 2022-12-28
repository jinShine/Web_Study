import React from "react";
import Comment from "./Comment";

const comments = [
  {
    name: "버즈",
    comment: "안녕하세요. 1빠입니다.",
  },
  {
    name: "쩡",
    comment: "안녕하세요. 2빠입니다.",
  },
];
function CommentList(props) {
  return (
    <div>
      {comments.map((comment) => {
        return <Comment name={comment.name} comment={comment.comment} />;
      })}
    </div>
  );
}

export default CommentList;
