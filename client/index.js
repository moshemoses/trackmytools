import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import store, { getMe, getUsersTools } from "./store";
import Login from "./login";
import UserPage from "./user-page";

const Main = withRouter(
  class extends Component {
    async componentDidMount() {
      await store.dispatch(getMe());

      this.props.history.push("/home");
    }

    async componentDidUpdate() {
      await store.dispatch(getUsersTools());
    }

    render() {
      return (
        <Switch>
          <Route path="/home" component={UserPage} />
          <Route component={Login} />
        </Switch>
      );
    }
  }
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("app")
);
