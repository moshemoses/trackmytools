import React, { Component } from "react";
import { connect } from "react-redux";
import { addToolToDB } from "../store";
import { Redirect } from "react-router-dom";

class AddTools extends React.Component {
  constructor(props) {
    super(props);

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
      <div id="addToolForm" className="container row">
        <form
          id="flex-container"
          onSubmit={async () => {
            console.log("our props are here i think", this.props);
            await this.props.handleSubmit(this.state);
            this.setState(this.initialState);
          }}
          className="col 12"
        >
          <div className="row">
            <div className="col s12 center-align">Add a Tool:</div>
          </div>
          <div className="row">
            <div className="input-field col 6">
              <input
                type="text"
                name="toolType"
                value={this.state.toolType}
                onChange={this.handleChange}
              />
              <label className="active">Tool Type:</label>
            </div>
            <div className="input-field col 6">
              <input
                type="text"
                name="identifyingDetails"
                value={this.state.identifyingDetails}
                onChange={this.handleChange}
              />
              <label className="active">Identifying Details:</label>
            </div>
            <div className="input-field col 6">
              <input
                size="1"
                maxLength="2"
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.handleChange}
                className="validate"
              />
              <label className="active">Age: </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col 6">
              <input
                type="text"
                name="manufacturer"
                value={this.state.manufacturer}
                onChange={this.handleChange}
              />
              <label className="active">Manufacturer:</label>
            </div>
            <div className="input-field col 6">
              <input
                type="text"
                name="accessories"
                value={this.state.accessories}
                onChange={this.handleChange}
              />
              <label className="active">Accessories:</label>
            </div>
            <div className="input-field col 6">
              <input
                type="text"
                name="loanstatus"
                value={this.state.loanstatus}
                onChange={this.handleChange}
              />
              <label className="active">Current Loan Status:</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="comments"
                value={this.state.comments}
                onChange={this.handleChange}
              />
              <label className="active">Comments:</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <select
                value={this.state.condition}
                onChange={this.handleChange}
                name="condition"
                className="browser-default"
              >
                <option value="" disabled selected>
                  Condition
                </option>
                <option value="broken">Broken</option>
                <option value="on the fritz">On the fritz</option>
                <option value="worn but works">Worn But Works</option>
                <option value="lightly used">Lightly Used</option>
                <option value="like new">Like New</option>
              </select>
              <label className="active">Condition</label>
            </div>
            <div className="input-field col s6">
              <select
                value={this.state.power}
                onChange={this.handleChange}
                name="powered"
                className="browser-default"
              >
                <option value="" disabled selected>
                  Power Source
                </option>
                <option value="not-powered">Hand Power</option>
                <option value="battery">Battery Powered</option>
                <option value="corded">Corded</option>
              </select>
              <label className="active">Power Source</label>
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn waves-effect waves-light"
          />
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
