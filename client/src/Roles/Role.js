import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import Delete from "./Actions/Delete";

const Role = (props) => {
  return (
    <>
      <tr key={props.roleInfo.id}>
        <td>{props.roleInfo.id}</td>
        <td>{props.roleInfo.name}</td>
        <td className="text-center">
          <span>
            <Link to={`/update-role?id=${props.roleInfo.id}`}>
              <Button color="warning m-1 p-1">
                <FiEdit />
              </Button>
            </Link>
          </span>
          <span>
            <Delete roleInfo={props.roleInfo} />
          </span>
        </td>
      </tr>
    </>
  );
};

export default Role;
