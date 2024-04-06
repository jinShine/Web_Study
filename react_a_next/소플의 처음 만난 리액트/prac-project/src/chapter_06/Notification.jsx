import React from "react";

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("# componentDidMount");
  }

  componentDidUpdate() {
    console.log("# componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("# componentWillUnmount");
  }

  render() {
    return (
      <div styles={styles.wrapper}>
        <span styles={styles.messageText}>{this.props.message}</span>
      </div>
    );
  }
}

export default Notification;

const styles = {
  wrapper: {
    margin: 8,
    paddding: 8,
    display: "flex",
    flexDirection: "row",
    border: "1px solid grey",
    borderRadius: 16,
  },
  messageText: {
    color: "black",
    fontSize: 16,
  },
};
