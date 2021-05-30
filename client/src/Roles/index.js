import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRoles } from "../store/actions/role";
import Role from "./Role";

import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Button } from "reactstrap";

import MainLayout from "../Layout/MainLayout";
import { Table, Widget, Loading, Pagination } from "../UI";
const Roles = (props) => {
  const { roles, loading, pager } = useSelector((state) => state.role);

  const pagerInfo = {
    ...pager,
    itemsText: "roles",
    href: "/roles",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getPage = () => {
      const params = new URLSearchParams(props.location.search);
      return parseInt(params.get("page")) || 1;
    };
    dispatch(getRoles(getPage()));
  }, [dispatch, props.location.search]);

  const headerColumns = ["Id", "name"];
  return (
    <MainLayout {...props}>
      <Widget id="tableSimple" className="col-lg-6 col-6 layout-spacing">
        {!loading ? (
          <>
            <Link to="/add-role">
              <Button color="primary" className="float-right mb-3 p-2">
                <FiPlus />
                <span> Add Role</span>
              </Button>
            </Link>
            <Table headerColumns={headerColumns}>
              {roles.map((role) => {
                return <Role key={role.id} roleInfo={role}></Role>;
              })}
            </Table>
            <Pagination pager={pagerInfo} />
          </>
        ) : (
          <Loading />
        )}
      </Widget>
    </MainLayout>
  );
};

export default Roles;
