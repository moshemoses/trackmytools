import React from "react";
import { connect } from "react-redux";
import { login } from "./store";
import LocalLoginForm from "./local-login-form";
import OauthLoginForm from "./oauth-login-form";

const Login = props => {
  const { handleSubmit } = props;

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card medium">
          <span className="card-title">Tool Chain</span>
          <div className="card-image">
            <img src="toolbox.png" className="responsive-img" />
          </div>
          <div className="card-content">
            <p>Track your tool with us.</p>
          </div>
          <div className="card-action">
            <LocalLoginForm handleSubmit={handleSubmit} />
            <br />
            <OauthLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(login({ email, password })).then(() => {
        ownProps.history.push("/home");
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
