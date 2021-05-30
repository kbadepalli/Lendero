import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import Delete from "./Actions/Delete";
import { Address } from "../UI";
const Client = (props) => {
  return (
    <>
      <tr>
        <td>{props.clientInfo.id}</td>
        <td>
          {props.clientInfo.firstName} {props.clientInfo.lastName}
        </td>
        <td>{props.clientInfo.email}</td>
        <td>
          Contact: {props.clientInfo.contactNumber} <br />
          Work: {props.clientInfo.workNumber}
        </td>
        <td>
          <Address address={props.clientInfo}></Address>
        </td>
        <td className="text-center">
          <span>
            <Link to={`/update-client?id=${props.clientInfo.id}`}>
              <Button color="warning m-1 p-1">
                <FiEdit />
              </Button>
            </Link>
          </span>
          <span>
            <Delete clientInfo={props.clientInfo} />
          </span>
        </td>
      </tr>
    </>
  );
};

export default Client;
