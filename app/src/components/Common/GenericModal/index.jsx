import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OkSVG from '../SVG/ok';

const GenericModal = props => {
  const { modal, handleClose, message } = props;
  return (
    <Modal show={modal} onHide={handleClose}>
      <Modal.Header className="custom-modal-header" closeButton>
        <Modal.Title className="custom-modal-title">
          <OkSVG />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">{message}</Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button
          className="custom-modal-accept-button custom-shadow"
          variant="primary"
          onClick={handleClose}
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

GenericModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default GenericModal;
