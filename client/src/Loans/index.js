import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Button } from "reactstrap";
import { getLoans } from "../store/actions/loan";
import MainLayout from "../Layout/MainLayout";
import Loan from "./Loan";
import { Table, Widget, Loading, Pagination } from "../UI";

const Loans = (props) => {
  const { loans, loading, pager } = useSelector((state) => state.loan);
  const pagerInfo = {
    ...pager,
    itemsText: "loans",
    href: "/loans",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getPage = () => {
      const params = new URLSearchParams(props.location.search);
      return parseInt(params.get("page")) || 1;
    };

    dispatch(getLoans(getPage()));
  }, [dispatch, props.location.search]);

  const headerColumns = [
    "Id",
    "client name",
    "document number",
    "loan amount",
    "rate of interest",
    "type",
    "period",
    "initiation date",
  ];

  return (
    <MainLayout {...props}>
      <Widget id="tableSimple" className="col-lg-12 col-12 layout-spacing">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link to="/add-loan">
              <Button color="primary" className="float-right mb-3 p-2">
                <FiPlus />
                <span> Add Loan</span>
              </Button>
            </Link>
            <Table headerColumns={headerColumns}>
              {loans.map((loan) => {
                return <Loan key={loan.id} loanInfo={loan}></Loan>;
              })}
            </Table>
            <Pagination pager={pagerInfo} />
          </>
        )}
      </Widget>
    </MainLayout>
  );
};

export default Loans;
