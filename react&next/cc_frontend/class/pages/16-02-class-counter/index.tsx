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

  onClickCountUp = () => {
    this.setState({ count: 1 });
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
