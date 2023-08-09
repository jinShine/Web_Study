import { Component, ReactNode } from "react";

export default class CounterPage extends Component {
  state = {
    count: 0,
  };

  // onClickCountUp() {
  //   this.setState((prev) => {
  //     count: 1;
  //   });
  // }

  componentDidMount() {
    console.log("그려지고 나서 실행");
  }

  componentDidUpdate(): void {
    console.log("변경되고 나서 실행");
  }

  componentWillUnmount(): void {
    console.log("사라질때 실행");
    // ex) 화면 이동, 채팅방 나가기 등등...
  }

  onClickCountUp = () => {
    this.setState((prev: { count: number }) => {
      count: prev.count + 1;
    });
  };

  render(): ReactNode {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>
          {/* <button onClick={this.onClickCountUp.bind(this)}> */}
          카운트 올리기
        </button>
      </>
    );
  }
}
