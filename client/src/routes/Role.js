import React from "react";
import PrivateRoute from "../Auth/PrivateRoute";
import Roles from "../Roles";
import AddRole from "../Roles/Actions/Add";
import UpdateRole from "../Roles/Actions/Update";

const routes = [
  <PrivateRoute
    exact
    path="/roles"
    pageTitle="Roles"
    component={Roles}
    key="1"
  />,
  <PrivateRoute
    exact
    path="/add-role"
    pageTitle="AddRole"
    component={AddRole}
    key="2"
  />,
  <PrivateRoute
    exact
    path="/update-role"
    pageTitle="UpdateRole"
    component={UpdateRole}
    key="r3"
  />,
];

export default routes;
