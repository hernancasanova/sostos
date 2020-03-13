import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddEdit from '../../../components/Common/AddEdit';
import { validateText } from '../../../formValidators';
import PATHS from '../../../paths';
import { validateHistory } from '../../../validators';

const fieldsAdd = [
  {
    label: 'Nombres',
    value: 'firstName',
    type: 'text',
    validation: validateText
  },
  {
    label: 'Apellidos',
    value: 'lastName',
    type: 'text',
    validation: validateText
  },
  {
    label: 'Email',
    value: 'email',
    type: 'text'
  },
  {
    label: 'Matrícula',
    value: 'enrollment',
    type: 'text'
  },
  {
    label: 'Rut',
    value: 'rut',
    type: 'text'
  },
  {
    label: 'Curso',
    value: 'course',
    type: 'text'
  },
  {
    label: 'Asignatura',
    value: 'subject',
    type: 'text'
  },
  {
    label: 'Año',
    value: 'year',
    type: 'text'
  }
];

// eslint-disable-next-line react/prefer-stateless-function
class AddAttendeeModal extends Component {
  render() {
    const {
      modal,
      closeModal,
      bindAttendees,
      selectedInstitution,
      attendeesAdd,
      id,
      history
    } = this.props;
    return (
      <Modal size="xl" className="group-attendees-modal" show={modal} onHide={closeModal}>
        <Modal.Header className="custom-modal-header" closeButton>
          {true && (
            <Modal.Title className="custom-modal-title custom-modal-title-text">
              Agregar Asistente
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body className="group-attendees-modal-body">
          <AddEdit
            showModal={false}
            noHeader
            groupId={id}
            selectedInstitution={selectedInstitution}
            // addItemFunctionCallback={() => history.push(PATHS.ATTENDEES)}
            addItemFunctionCallback={closeModal}
            addItemFunction={attendeesAdd}
            addItemMessage="El asistente fue creado correctamente"
            title="Agregar Asistente"
            fields={fieldsAdd}
            history={history}
          />
        </Modal.Body>
        {false && (
          <Modal.Footer className="custom-modal-footer">
            <Button
              disabled
              className="custom-modal-accept-button custom-shadow"
              variant="primary"
              onClick={bindAttendees}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    );
  }
}

AddAttendeeModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  bindAttendees: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  attendeesAdd: PropTypes.func.isRequired,
  history: validateHistory.isRequired,
  id: PropTypes.number.isRequired
};

export default AddAttendeeModal;
