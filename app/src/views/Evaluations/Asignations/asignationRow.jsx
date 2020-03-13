/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PreviewPDF from '../../../components/Common/PreviewPDF';
// import { validateEvaluation } from '../../../validators';

class AsignationRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewModal: false,
      attendeesModal: false
    };
  }

  render() {
    const { asignation } = this.props;
    const { previewModal, attendeesModal } = this.state;
    const { group, attendees, evaluation, questions, date } = asignation;
    return (
      <React.Fragment>
        <tr>
          <td>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => this.setState({ previewModal: true })}
            >
              <u>{evaluation.name}</u>
            </span>
          </td>
          <td>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => this.setState({ previewModal: true })}
            >
              <u>{questions.length}</u>
            </span>
          </td>
          <td>{group.name}</td>
          <td>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => this.setState({ attendeesModal: true })}
            >
              <u>{attendees.length}</u>
            </span>
          </td>
          <td>{date}</td>

          {false && (
            <td>
              <button
                onClick={() => this.setState({ previewModal: true })}
                className="btn btn-primary"
                type="button"
              >
                Vista Previa
              </button>
            </td>
          )}
        </tr>
        <PreviewPDF
          title={evaluation.name}
          questions={questions}
          modal={previewModal}
          handleClose={() => this.setState({ previewModal: false })}
        />
        <Modal
          size="xl"
          show={attendeesModal}
          onHide={() => this.setState({ attendeesModal: false })}
        >
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title className="custom-modal-title"></Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">
            <Table className="sosto-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map(attendee => (
                  <tr>
                    <td>{attendee.firstName}</td>
                    <td>{attendee.lastName}</td>
                    <td>{attendee.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button
              className="custom-modal-accept-button custom-shadow"
              variant="primary"
              onClick={() => this.setState({ attendeesModal: false })}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
AsignationRow.propTypes = {
  // evaluation: validateEvaluation.isRequired
};

export default AsignationRow;
