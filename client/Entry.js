import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store";
import DisplayTools from "./components/displayTools";
import AddTools from "./components/addTools";
import ToggleHelper from "./components/toggleHelper";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in entry", props);
    this.user = props.user;
    this.handleClick = props.handleClick;
    this.displayToolAdder = this.displayToolAdder.bind(this);

    this.state = { displayAdder: false };
  }

  displayToolAdder() {
    if (this.state.displayAdder) {
      this.setState({ displayAdder: false });
    } else {
      this.setState({ displayAdder: true });
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <div class="right">{this.user.email}</div>
            <a class="brand-logo center">Tool Belt </a>
            {/* <ul id="nav-mobile" class="left hide-on-med-and-down"> */}
            <ul>
              <li>
                <a onClick={this.displayToolAdder}>Add Tools</a>
              </li>
              <li>
                <a onClick={this.handleClick}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <div>{!this.state.displayAdder ? <div /> : <AddTools />}</div>
          <DisplayTools />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout()).then(() => {
        ownProps.history.push("/");
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Entry);
