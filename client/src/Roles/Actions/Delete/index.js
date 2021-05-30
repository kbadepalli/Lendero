import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import { deleteRole } from "../../../store/actions/role";
const DeleteRole = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const delRole = () => {
    dispatch(deleteRole(props.roleInfo.id));
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
          Are yousure you want to delete role with name: {props.roleInfo.name}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={delRole}>
            Delete Role
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteRole;
