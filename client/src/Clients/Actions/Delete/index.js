import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import { deleteClient } from "../../../store/actions/client";
import { useState } from "react";
const DeleteClient = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const delClient = () => {
    dispatch(deleteClient(props.clientInfo.id));
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
          Are yousure you want to delete client with name:{" "}
          {props.clientInfo.firstName} {props.clientInfo.lastName}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={delClient}>
            Deletle Client
          </Button>{" "}
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteClient;
