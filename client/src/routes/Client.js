import PrivateRoute from "../Auth/PrivateRoute";
import Clients from "../Clients";
import AddClient from "../Clients/Actions/Add";
import UpdateClient from "../Clients/Actions/Update";

const routes = [
  <PrivateRoute
    exact
    path="/clients"
    pageTitle="Clients"
    component={Clients}
    key="c1"
  />,
  <PrivateRoute
    exact
    path="/add-client"
    pageTitle="Add Client"
    component={AddClient}
    key="c2"
  />,
  <PrivateRoute
    exact
    path="/update-client"
    pageTitle="UpdateClient"
    component={UpdateClient}
    key="c3"
  />,
];

export default routes;
