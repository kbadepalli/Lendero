import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import Delete from "./Actions/Delete";
const User = (props) => {
  return (
    <>
      <tr>
        <td>{props.userInfo.fullName}</td>
        <td>{props.userInfo.email}</td>
        <td>{props.userInfo.role.name}</td>
        <td className="text-center">
          <span>
            <Link to={`/update-user?id=${props.userInfo.id}`}>
              <Button color="warning m-1 p-1">
                <FiEdit />
              </Button>
            </Link>
          </span>
          <span>
            <Delete userInfo={props.userInfo} />
          </span>
        </td>
      </tr>
    </>
  );
};

export default User;
