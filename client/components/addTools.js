import React, { Component } from "react";
import { connect } from "react-redux";
import { addToolToDB } from "../store";
import { Redirect } from "react-router-dom";

class AddTools extends React.Component {
  constructor(props) {
    super(props);

    console.log("user is here", props.user);
    this.initialState = {
      toolType: "",
      identifyingDetails: "",
      manufacturer: "",
      age: 0,
      condition: "",
      powered: "",
      accessories: "",
      loanstatus: "Not Currently Loaned",
      comments: ""
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div id="addToolForm">
        <form
          id="flex-container"
          onSubmit={async () => {
            await this.props.handleSubmit(this.state);
            this.setState(this.initialState);
          }}
        >
          <label>
            Tool Type:
            <input
              type="text"
              name="toolType"
              value={this.state.toolType}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Identifying Details:
            <input
              type="text"
              name="identifyingDetails"
              value={this.state.identifyingDetails}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Manufacturer:
            <input
              type="text"
              name="manufacturer"
              value={this.state.manufacturer}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Approximate Age:
            <input
              size="1"
              maxLength="2"
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Select Condition:
            <select
              value={this.state.condition}
              onChange={this.handleChange}
              name="condition"
            >
              <option value="blank">-------</option>
              <option value="broken">Broken</option>
              <option value="on the fritz">On the fritz</option>
              <option value="worn but works">Worn But Works</option>
              <option value="lightly used">Lightly Used</option>
              <option value="like new">Like New</option>
            </select>
          </label>
          <label>
            Power Source:
            <select
              value={this.state.power}
              onChange={this.handleChange}
              name="powered"
            >
              <option value="blank">-------</option>
              <option value="not-powered">Hand Power</option>
              <option value="battery">Battery Powered</option>
              <option value="corded">Corded</option>
            </select>
          </label>
          <label>
            Accessories:
            <input
              type="text"
              name="accessories"
              value={this.state.accessories}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Current Loan Status:
            <input
              type="text"
              name="loanstatus"
              value={this.state.loanstatus}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Comments:
            <input
              type="text"
              name="comments"
              value={this.state.comments}
              onChange={this.handleChange}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(tool) {
      event.preventDefault();

      dispatch(addToolToDB(tool));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTools);
