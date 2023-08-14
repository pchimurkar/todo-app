/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmDialog = ({
  onYesClickHandler,
  onCancelClickHandler,
  confirmShow,
  Message,
  Title,
}) => {
  const handleClose = () => onCancelClickHandler();
  const yesClickHandler = () => onYesClickHandler();

  return (
    <>
      <Modal show={confirmShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "blue" }}>{Message}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={yesClickHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDialog;