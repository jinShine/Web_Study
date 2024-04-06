import { useApolloClient } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import Lazyload from "react-lazyload";

export default function Page() {
  const onClickPreload = () => {
    const img = new Image();
    img.src = "https://picsum.photos/200/300?random=7";
    img.onload = (event) => {
      console.log(event);
    };
  };

  return (
    <>
      <div>
        <button
          style={{ width: "500px", height: "100px", marginBottom: "30px" }}
          onClick={onClickPreload}
        >
          이미지 보여주기
        </button>
      </div>
      <div className="list">
        <Lazyload height={500}>
          <img
            src="https://picsum.photos/200/300?random=1"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload height={500}>
          <img
            src="https://picsum.photos/200/300?random=2"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload height={500}>
          <img
            src="https://picsum.photos/200/300?random=3"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload height={500} offset={100}>
          <img
            src="https://picsum.photos/200/300?random=4"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload height={500} offset={100}>
          <img
            src="https://picsum.photos/200/300?random=5"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload height={500}>
          <img
            src="https://picsum.photos/200/300?random=6"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload height={500}>
          <img
            src="https://picsum.photos/200/300?random=7"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload throttle={200} height={500}>
          <img
            src="https://picsum.photos/200/300?random=8"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload throttle={200} height={500}>
          <img
            src="https://picsum.photos/200/300?random=9"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload throttle={200} height={500}>
          <img
            src="https://picsum.photos/200/300?random=10"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload throttle={200} height={500}>
          <img
            src="https://picsum.photos/200/300?random=11"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload throttle={200} height={500}>
          <img
            src="https://picsum.photos/200/300?random=12"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
        <Lazyload throttle={200} height={500}>
          <img
            src="https://picsum.photos/200/300?random=13"
            style={{ width: "500px", height: "500px" }}
          />
        </Lazyload>
      </div>
    </>
  );
}
