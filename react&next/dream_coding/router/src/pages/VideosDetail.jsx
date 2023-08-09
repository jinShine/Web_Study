import React from "react";
import { useParams } from "react-router-dom";

export default function VideosDetail() {
  // const params = useParams();
  // console.log(params);
  const { id } = useParams();
  console.log("넘어온 데이터 : ", id);

  return <div>VideosDetail</div>;
}
