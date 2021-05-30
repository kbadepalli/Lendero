import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import Delete from "./Actions/Delete";

const Loan = (props) => {
  return (
    <>
      <tr>
        <td>{props.loanInfo.id}</td>
        <td>
          {props.loanInfo.client.firstName} {props.loanInfo.client.lastName}
        </td>
        <td>{props.loanInfo.documentNumber}</td>
        <td>
          $
          {Math.round(
            (parseInt(props.loanInfo.loanAmount) * 100) / 100
          ).toFixed(2)}
        </td>
        <td>
          {Math.round(
            (parseInt(props.loanInfo.rateOfInterest) * 100) / 100
          ).toFixed(2)}
          %
        </td>
        <td>{props.loanInfo.loanName}</td>
        <td>{props.loanInfo.loanPeriod} Months</td>
        <td>{props.loanInfo.dateOfLoan}</td>
        <td className="text-center">
          <span>
            <Link to={`/update-loan/${props.loanInfo.id}`}>
              <Button color="warning m-1 p-1">
                <FiEdit />
              </Button>
            </Link>
          </span>
          <span>
            <Delete loanInfo={props.loanInfo} />
          </span>
        </td>
      </tr>
    </>
  );
};

export default Loan;
