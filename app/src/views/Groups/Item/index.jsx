import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoBack from '../../../components/GoBack';
import { validateHistory, validateGroup, validateAttendees } from '../../../validators';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import NewButton from '../../../components/Buttons/NewButton';
import ItemsTable from '../../../components/Common/ItemsList/itemsTable';
import PATHS from '../../../paths';
import AttendeesModal from './attendeesModal';
import GenericModal from './genericModal';
import AddAttendeeModal from './addAttendeeModal';

// eslint-disable-next-line react/prefer-stateless-function
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selected: {},
      selectedModal: {},
      createdAttendeeModal: false,
      addAttendeeModal: false,
      modalBinded: false,
      modalUnbinded: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.clickCheckbox = this.clickCheckbox.bind(this);
    this.clickCheckboxModal = this.clickCheckboxModal.bind(this);
    this.unbindAttendees = this.unbindAttendees.bind(this);
    this.bindAttendees = this.bindAttendees.bind(this);
    this.openModalBinded = this.openModalBinded.bind(this);
    this.closeModalBinded = this.closeModalBinded.bind(this);
    this.openModalUnbinded = this.openModalUnbinded.bind(this);
    this.closeModalUnbinded = this.closeModalUnbinded.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.checkItem();
  }

  componentDidUpdate() {
    this.checkItem();
  }

  checkItem() {
    const { group, history } = this.props;
    if (group === false) {
      history.replace(PATHS.GROUPS);
    }
  }

  openModalBinded() {
    this.setState({
      modalBinded: true
    });
  }

  closeModalBinded() {
    this.setState({
      modalBinded: false
    });
  }

  openModalUnbinded() {
    this.setState({
      modalUnbinded: true
    });
  }

  closeModalUnbinded() {
    this.setState({
      modalUnbinded: false
    });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  openModal() {
    this.setState({ modal: true });
  }

  clickCheckbox(id, e) {
    const { selected } = this.state;
    const selectedAux = Object.assign({}, selected);
    selectedAux[id] = e.target.checked;
    Object.keys(selectedAux).forEach(singleSelect => {
      if (selectedAux[singleSelect] === false) {
        delete selectedAux[singleSelect];
      }
    });
    this.setState({
      selected: selectedAux
    });
  }

  clickCheckboxModal(id, e) {
    const { selectedModal } = this.state;
    const selectedModalAux = Object.assign({}, selectedModal);
    selectedModalAux[id] = e.target.checked;
    Object.keys(selectedModalAux).forEach(singleSelect => {
      if (selectedModalAux[singleSelect] === false) {
        delete selectedModalAux[singleSelect];
      }
    });
    this.setState({
      selectedModal: selectedModalAux
    });
  }

  unbindAttendees() {
    const { selected } = this.state;
    const { groupsUnbindAttendees, group } = this.props;
    groupsUnbindAttendees(
      group,
      Object.keys(selected).map(singleSelect => parseInt(singleSelect, 10))
    );
    this.setState({ selected: {}, modalUnbinded: true });
  }

  bindAttendees() {
    const { selectedModal } = this.state;
    const { groupsBindAttendees, group } = this.props;
    const selectedElements = Object.keys(selectedModal).length > 0;
    if (selectedElements) {
      groupsBindAttendees(
        group,
        Object.keys(selectedModal).map(singleSelect => parseInt(singleSelect, 10))
      );
    }
    this.setState({ selectedModal: {}, modal: false, modalBinded: selectedElements });
  }

  render() {
    const { history, attendees, group, selectedInstitution, attendeesAdd } = this.props;
    const { id } = group;
    const {
      modal,
      selected,
      modalBinded,
      modalUnbinded,
      selectedModal,
      addAttendeeModal,
      createdAttendeeModal
    } = this.state;
    const valido = typeof group !== 'undefined' && typeof group.attendees !== 'undefined';
    if (!valido) {
      return (
        <Container>
          <Row>
            <Col>
              <GoBack history={history} />
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{group.name}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="groups-subtitle-container">
            <div
              style={{ lineHeight: '36px' }}
              className="float-left groups-attendees-title noselect"
            >
              Asistentes
            </div>
            <DeleteButton
              disabled={!Object.keys(selected).length > 0}
              style={{ marginLeft: '16px' }}
              className="MyEnterprisesNewButton button-delete-institution float-right custom-shadow"
              text="Remover Asistentes"
              onClick={this.unbindAttendees}
            />
            <NewButton
              className="MyEnterprisesNewButton button-add-attendees float-right custom-shadow"
              text="Agregar Asistentes"
              onClick={this.openModal}
            />
            <NewButton
              className="MyEnterprisesNewButton button-edit-institution float-right custom-shadow"
              text="Editar Grupo"
              url={PATHS.GROUPS_EDIT + id}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ItemsTable
              selected={selected}
              mainColumn="firstName"
              onClick={this.clickCheckbox}
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
              url={PATHS.ATTENDEES_PRE_SINGLE}
              selectedInstitution={selectedInstitution}
              items={attendees.filter(attendee => group.attendees.indexOf(attendee.id) !== -1)}
            />
          </Col>
        </Row>
        <AttendeesModal
          selected={selectedModal}
          selectedInstitution={selectedInstitution}
          modal={modal}
          closeModal={this.closeModal}
          clickCheckboxModal={this.clickCheckboxModal}
          attendees={attendees}
          group={group}
          addAttendeeModalShow={() => this.setState({ modal: false, addAttendeeModal: true })}
          bindAttendees={this.bindAttendees}
        />
        <GenericModal
          modal={modalBinded}
          handleClose={this.closeModalBinded}
          message="Asistente asignado exitosamente"
        />
        <GenericModal
          modal={createdAttendeeModal}
          handleClose={() =>
            this.setState({
              createdAttendeeModal: false,
              modal: true
            })
          }
          message="Asistente creado exitosamente"
        />
        <GenericModal
          modal={modalUnbinded}
          handleClose={this.closeModalUnbinded}
          message="Asistentes eliminados exitosamente"
        />
        <AddAttendeeModal
          id={id}
          selectedInstitution={selectedInstitution}
          history={history}
          attendeesAdd={attendeesAdd}
          modal={addAttendeeModal}
          closeModal={() => this.setState({ addAttendeeModal: false, createdAttendeeModal: true })}
        />
      </Container>
    );
  }
}

Item.propTypes = {
  attendees: validateAttendees.isRequired,
  history: validateHistory.isRequired,
  group: PropTypes.oneOfType([PropTypes.bool, validateGroup.isRequired]).isRequired,
  groupsUnbindAttendees: PropTypes.func.isRequired,
  groupsBindAttendees: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  attendeesAdd: PropTypes.func.isRequired
};

export default Item;
