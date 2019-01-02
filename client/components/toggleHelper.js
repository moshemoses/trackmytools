import React, { Component } from "react";
import AddTools from "./addTools";

class ToggleHelper extends React.Component {
  constructor() {
    super();
    this.state = { displayTool: false };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    this.state.displayTool
      ? this.setState({ displayTool: false })
      : this.setState({ displayTool: true });
  }

  render() {
    return (
      <div>
        <div onClick={this.toggleState} className="addtooltoggle">
          Display/Remove Add Panel Click here
        </div>
        <div>{!this.state.displayTool ? <div /> : <AddTools />}</div>
      </div>
    );
  }
}

export default ToggleHelper;
