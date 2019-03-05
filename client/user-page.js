import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store";
import DisplayTools from "./components/displayTools";
import AddTools from "./components/addTools";
import ToggleHelper from "./components/toggleHelper";
import Entry from "./Entry";

const UserPage = props => {
  const { user, handleClick } = props;

  if (!user.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Entry user={user} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
