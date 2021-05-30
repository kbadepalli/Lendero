import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import { deleteLoan } from "../../../store/actions/loan";

const DeleteLoan = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const delLoan = () => {
    dispatch(deleteLoan(props.loanInfo.id));
    toggle();
  };

  return (
    <>
      <Button color="danger" className="m-1 p-1" onClick={toggle}>
        <FiTrash2 />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>Delete Loan</ModalHeader>
        <ModalBody>
          Are yousure you want to delete loan with document number:
          {props.loanInfo.documentNumber}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={delLoan}>
            Deletle Loan
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default DeleteLoan;
