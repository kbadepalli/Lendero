import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import { deleteUser } from "../../../store/actions/user";
const DeleteUser = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const delUser = () => {
    dispatch(deleteUser(props.userInfo.id));
    toggle();
  };

  return (
    <>
      <Button color="danger" className="m-1 p-1" onClick={toggle}>
        <FiTrash2 />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Are yousure you want to delete user with email: {props.userInfo.email}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={delUser}>
            Deletle User
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteUser;
