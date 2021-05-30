import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/styles/App.scss";

import PrivateRoute from "./Auth/PrivateRoute";

import { roleRoutes, userRoutes, clientRoutes, loanRoutes } from "./routes";
import Dashboard from "./Dashboard";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/" component={Dashboard} /> */}
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute
            exact
            path="/"
            pageTitle="Dashboard"
            component={Dashboard}
          />
          {roleRoutes}
          {userRoutes}
          {clientRoutes}
          {loanRoutes}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
