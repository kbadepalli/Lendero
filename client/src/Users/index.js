import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Button } from "reactstrap";
import { getUsers } from "../store/actions/user";
import MainLayout from "../Layout/MainLayout";
import User from "./User";
import Table from "../UI/Table";
import Widget from "../UI/Widget";
import Loading from "../UI/Loading";
import Pager from "../UI/Pagination";
const Users = (props) => {
  const { users, loading, pager } = useSelector((state) => state.user);
  const pagerInfo = {
    ...pager,
    itemsText: "users",
    href: "/users",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getPage = () => {
      const params = new URLSearchParams(props.location.search);
      return parseInt(params.get("page")) || 1;
    };
    dispatch(getUsers(getPage()));
  }, [dispatch, props.location.search]);

  const headerColumns = ["Full name", "Email", "Role"];

  return (
    <MainLayout {...props}>
      <Widget id="tableSimple" className="col-lg-6 col-6 layout-spacing">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link to="/add-user">
              <Button color="primary" className="float-right mb-3 p-2">
                <FiPlus />
                <span> Add User</span>
              </Button>
            </Link>
            <Table headerColumns={headerColumns}>
              {users.map((user) => {
                return <User key={user.id} userInfo={user}></User>;
              })}
            </Table>
            <Pager pager={pagerInfo} />
          </>
        )}
      </Widget>
    </MainLayout>
  );
};

export default Users;
