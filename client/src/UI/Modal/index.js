import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { UI } from "../";

const ModalUi = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const button = UI[props.type].button;

  const modalButtons = UI[props.type].modalButtons;

  const primaryButton = (
    <Button
      color={modalButtons.primary.color}
      onClick={toggle}
      type={modalButtons.primary.type}
    >
      {modalButtons.primary.text}
    </Button>
  );

  const secondaryButton = (
    <Button
      color={modalButtons.secondary.color}
      onClick={toggle}
      type={modalButtons.secondary.type}
    >
      {modalButtons.secondary.text}
    </Button>
  );

  return (
    <span>
      <Button className="m-1 p-1" onClick={toggle} color={button.color}>
        {button.icon}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          {primaryButton}
          {secondaryButton}
        </ModalFooter>
      </Modal>
    </span>
  );
};

export default ModalUi;
