import React from "react";
import PrivateRoute from "../Auth/PrivateRoute";
import Loans from "../Loans";
import AddLoan from "../Loans/Actions/Add";
// import UpdateLoan from '../Loans/Actions/Update';

const routes = [
  <PrivateRoute
    exact
    path="/loans"
    pageTitle="Loans"
    component={Loans}
    key="l1"
  />,
  <PrivateRoute
    exact
    path="/add-loan"
    pageTitle="Add Loan"
    component={AddLoan}
    key="l2"
  />,
  // <PrivateRoute
  //   exact
  //   path='/update-loan/:id'
  //   pageTitle='UpdateLoan'
  //   component={UpdateLoan}
  // />,
];

export default routes;
