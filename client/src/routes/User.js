import React from "react";
import PrivateRoute from "../Auth/PrivateRoute";
import Users from "../Users";
import AddUser from "../Users/Actions/Add";
import UpdateUser from "../Users/Actions/Update";

const routes = [
  <PrivateRoute
    exact
    path="/users"
    pageTitle="Users"
    component={Users}
    key="4"
  />,
  <PrivateRoute
    exact
    path="/add-user"
    pageTitle="AddUser"
    component={AddUser}
    key="5"
  />,
  <PrivateRoute
    exact
    path="/update-user"
    pageTitle="UpdateUser"
    component={UpdateUser}
    key="5"
  />,
];

export default routes;
