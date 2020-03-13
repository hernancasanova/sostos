import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ItemsTable from '../../../components/Common/ItemsList/itemsTable';
import { validateObjectives, validateSubtopic } from '../../../validators';
import NewButton from '../../../components/Buttons/NewButton';

// const AttendeesModal = props => {
class ObjectivesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searching: e.target.value
    });
  }

  render() {
    const {
      modal,
      closeModal,
      clickCheckboxModal,
      objectives,
      subtopic,
      bindObjectives,
      selected
    } = this.props;
    const { searching } = this.state;
    return (
      <Modal size="xl" className="group-attendees-modal" show={modal} onHide={closeModal}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title custom-modal-title-text">
            Asignar Objetivo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="group-attendees-modal-body">
          <Row>
            <Col lg="9">
              <input
                onChange={this.handleChange}
                value={searching}
                type="text"
                className="form-control"
                placeholder="Buscar"
              />
            </Col>
            <Col lg="3">
              <NewButton
                className="topics-subtopics-modal-ok-button"
                onClick={bindObjectives}
                text="Aceptar"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemsTable
                noFilter
                selected={selected}
                onClick={clickCheckboxModal}
                columns={[
                  {
                    label: 'Nombre',
                    value: 'name'
                  },
                  {
                    label: 'Descripción',
                    value: 'description'
                  }
                ]}
                url=""
                items={objectives.filter(
                  objective =>
                    subtopic.objectives.indexOf(objective.id) === -1 &&
                    `${objective.name.toLowerCase()}`.includes(searching.trim().toLowerCase())
                )}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button
            className="custom-modal-accept-button custom-shadow"
            variant="primary"
            onClick={bindObjectives}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ObjectivesModal.propTypes = {
  bindObjectives: PropTypes.func.isRequired,
  clickCheckboxModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
  objectives: validateObjectives.isRequired,
  subtopic: validateSubtopic.isRequired
};

export default ObjectivesModal;
