import React from "react";

const LocalLoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="email" className="active">
          Email
        </label>
        <input type="email" name="email" className="input" />
      </div>
      <div className="input-field">
        <label htmlFor="email" className="active">
          Password
        </label>
        <input type="password" name="password" className="input" />
      </div>
      <div className="m1">
        <button type="submit" className="btn waves-effect waves-light">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LocalLoginForm;
