import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Button } from "reactstrap";
import { getClients } from "../store/actions/client";
import MainLayout from "../Layout/MainLayout";
import Client from "./Client";
import { Table, Widget, Loading, Pagination } from "../UI";
const Clients = (props) => {
  const { clients, loading, pager } = useSelector((state) => state.client);
  const pagerInfo = {
    ...pager,
    itemsText: "clients",
    href: "/clients",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getPage = () => {
      const params = new URLSearchParams(props.location.search);
      return parseInt(params.get("page")) || 1;
    };
    dispatch(getClients(getPage()));
  }, [dispatch, props.location.search]);

  const headerColumns = ["Id", "name", "email", "contacts", "address"];

  return (
    <MainLayout {...props}>
      <Widget id="tableSimple" className="col-lg-12 col-12 layout-spacing">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link to="/add-client">
              <Button color="primary" className="float-right mb-3 p-2">
                <FiPlus />
                <span> Add Client</span>
              </Button>
            </Link>
            <Table headerColumns={headerColumns}>
              {clients.map((client) => {
                return <Client key={client.id} clientInfo={client}></Client>;
              })}
            </Table>
            <Pagination pager={pagerInfo} />
          </>
        )}
      </Widget>
    </MainLayout>
  );
};

export default Clients;
