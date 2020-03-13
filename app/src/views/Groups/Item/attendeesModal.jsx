import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from '../../../components/form/Select';
import ItemsTable from '../../../components/Common/ItemsList/itemsTable';
import { validateGroup, validateAttendees } from '../../../validators';

// const AttendeesModal = props => {
class AttendeesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: '',
      selectCourse: 0,
      selectSubject: 0,
      selectYear: 0
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
      selectedInstitution,
      modal,
      closeModal,
      clickCheckboxModal,
      attendees,
      group,
      bindAttendees,
      selected,
      addAttendeeModalShow
    } = this.props;
    const { searching, selectCourse, selectSubject, selectYear } = this.state;
    const arrayCourse = ['Todos los cursos'];
    const arraySubject = ['Todos las asignaturas'];
    const arrayYear = ['Todos los años'];
    attendees.forEach(attendee => {
      if (attendee.course && arrayCourse.indexOf(attendee.course) === -1)
        arrayCourse.push(attendee.course);
      if (attendee.subject && arraySubject.indexOf(attendee.subject) === -1)
        arraySubject.push(attendee.subject);
      if (attendee.year && arrayYear.indexOf(attendee.year) === -1) arrayYear.push(attendee.year);
    });
    const optionsCourse = arrayCourse.map((optionCourse, index) => {
      return { label: optionCourse, value: index };
    });
    const optionsSubject = arraySubject.map((optionSubject, index) => {
      return { label: optionSubject, value: index };
    });
    const optionsYear = arrayYear.map((optionYear, index) => {
      return { label: optionYear, value: index };
    });
    const selectedCourse = optionsCourse[selectCourse].label;
    const selectedSubject = optionsSubject[selectSubject].label;
    const selectedYear = optionsYear[selectYear].label;
    return (
      <Modal size="xl" className="group-attendees-modal" show={modal} onHide={closeModal}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title custom-modal-title-text">
            Agregar Asistentes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="group-attendees-modal-body">
          <Row style={{ marginBottom: '10px' }}>
            <Col lg="6">
              <input
                onChange={this.handleChange}
                value={searching}
                type="text"
                className="form-control"
                placeholder="Buscar"
              />
            </Col>

            <Col lg="6">
              <button
                onClick={addAttendeeModalShow}
                style={{ width: '100%' }}
                type="button"
                className="NewButton custom-shadow"
              >
                Nuevo Asistente
              </button>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Select
                value={selectCourse}
                onChange={e => this.setState({ selectCourse: e })}
                options={optionsCourse}
              />
            </Col>
            <Col lg="4">
              <Select
                slim
                value={selectSubject}
                onChange={e => this.setState({ selectSubject: e })}
                options={optionsSubject}
              />
            </Col>
            <Col lg="4">
              <Select
                slim
                value={selectYear}
                onChange={e => this.setState({ selectYear: e })}
                options={optionsYear}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemsTable
                selected={selected}
                selectedInstitution={selectedInstitution}
                onClick={clickCheckboxModal}
                columns={[
                  {
                    label: 'Nombres',
                    value: 'firstName'
                  },
                  {
                    label: 'Apellidos',
                    value: 'lastName'
                  },
                  {
                    label: 'Email',
                    value: 'email'
                  },
                  {
                    label: 'Matricula',
                    value: 'enrollment'
                  },
                  {
                    label: 'Rut',
                    value: 'rut'
                  },
                  {
                    label: 'Curso',
                    value: 'course'
                  },
                  {
                    label: 'Asignatura',
                    value: 'subject'
                  },
                  {
                    label: 'Año',
                    value: 'year'
                  }
                ]}
                url=""
                items={attendees
                  .filter(attendee => selectCourse === 0 || attendee.course === selectedCourse)
                  .filter(attendee => selectSubject === 0 || attendee.subject === selectedSubject)
                  .filter(attendee => selectYear === 0 || attendee.year === selectedYear)
                  .filter(
                    attendee =>
                      group.attendees.indexOf(attendee.id) === -1 &&
                      `${attendee.firstName.toLowerCase()} ${attendee.lastName.toLowerCase()}`.includes(
                        searching.trim().toLowerCase()
                      )
                  )}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button
            className="custom-modal-accept-button custom-shadow"
            variant="primary"
            onClick={bindAttendees}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AttendeesModal.propTypes = {
  // attendees: PropTypes.arrayOf(PropTypes.number).isRequired,
  attendees: validateAttendees.isRequired,
  bindAttendees: PropTypes.func.isRequired,
  clickCheckboxModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  group: validateGroup.isRequired,
  modal: PropTypes.bool.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired,
  addAttendeeModalShow: PropTypes.func.isRequired
};

export default AttendeesModal;
