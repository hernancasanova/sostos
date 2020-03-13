import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import ItemsList from '../../components/Common/ItemsList';
import {
  attendeesAdd,
  attendeesDelete,
  attendeesEdit,
  attendeesAddFromXlxs
} from '../../actions/AttendeesActions';
import { groupsAddFromXlxs } from '../../actions/GroupsActions';
import {
  validateHistory,
  validateAttendees,
  validateMatch,
  validateGroups
} from '../../validators';
import { validateText } from '../../formValidators';
import AddEdit from '../../components/Common/AddEdit';
import Load from './Load';
import NewButton from '../../components/Buttons/NewButton';

// #region Fields and Columns
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

const columns = [
  {
    label: 'Nombres',
    value: 'firstName'
  },
  /* {
    label: 'Id',
    value: 'id'
  }, */
  {
    label: 'Apellidos',
    value: 'lastName'
  },
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Matrícula',
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
];
// #endregion

const Attendees = props => {
  const {
    token,
    history,
    attendees,
    reduxAttendeesAdd,
    reduxAttendeesDelete,
    reduxAttendeesEdit,
    match,
    groups,
    selectedInstitution,
    reduxGroupsAddFromXlxs,
    reduxAttendeesAddFromXlxs
  } = props;
  const { params } = match;
  const { id } = params;
  const itemId = parseInt(id, 10);
  let item = attendees.find(attendee => attendee.id === itemId);
  item = item || false;
  const { institution } = item;
  if (institution !== selectedInstitution) {
    item = false;
  }
  return (
    <MainContent token={token} aside>
      <Switch>
        <Route exact path={PATHS.ATTENDEES_LOAD}>
          <Load
            history={history}
            attendeesAddFromXlxs={reduxAttendeesAddFromXlxs}
            groupsAddFromXlxs={reduxGroupsAddFromXlxs}
            selectedInstitution={selectedInstitution}
            attendees={attendees}
            groups={groups}
          />
        </Route>
        <Route exact path={PATHS.ATTENDEES}>
          <ItemsList
            extraButton={
              <NewButton
                className="MyEnterprisesNewButton extra-button-evaluations-list boton-agregar-institucion float-right custom-shadow"
                text="Cargar Archivo"
                url={PATHS.ATTENDEES_LOAD}
              />
            }
            mainColumn="firstName"
            title="Administrar Asistentes"
            addItemText="Agregar Asistente"
            addItemUrl={PATHS.ATTENDEES_ADD}
            deleteItemText="Eliminar Asistente"
            deleteItemFunction={reduxAttendeesDelete}
            history={history}
            selectedInstitution={selectedInstitution}
            items={attendees}
            singleItemUrl={PATHS.ATTENDEES_PRE_SINGLE}
            columns={columns}
            deleteItemMessage="Asistentes eliminados exitosamente"
          />
        </Route>
        <Route exact path={PATHS.ATTENDEES_ADD}>
          <AddEdit
            selectedInstitution={selectedInstitution}
            addItemFunctionCallback={() => history.push(PATHS.ATTENDEES)}
            addItemFunction={reduxAttendeesAdd}
            addItemMessage="El asistente fue creado correctamente"
            title="Agregar Asistente"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        <Route exact path={`${PATHS.ATTENDEES_PRE_SINGLE}:id`}>
          <AddEdit
            itemRequired
            itemRequiredUrl={PATHS.ATTENDEES}
            item={item}
            selectedInstitution={selectedInstitution}
            addItemFunction={reduxAttendeesEdit}
            addItemMessage="El asistente fue editado correctamente"
            title="Editar Asistente"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
      </Switch>
    </MainContent>
  );
};

Attendees.propTypes = {
  token: PropTypes.string.isRequired,
  reduxAttendeesAdd: PropTypes.func.isRequired,
  reduxAttendeesDelete: PropTypes.func.isRequired,
  history: validateHistory.isRequired,
  attendees: validateAttendees.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  match: validateMatch.isRequired,
  reduxAttendeesEdit: PropTypes.func.isRequired,
  groups: validateGroups.isRequired,
  reduxGroupsAddFromXlxs: PropTypes.func.isRequired,
  reduxAttendeesAddFromXlxs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  attendees: state.attendees,
  token: state.auth.token,
  selectedInstitution: state.institutions.selectedInstitution,
  groups: state.groups
});

export default connect(
  mapStateToProps,
  {
    reduxAttendeesAdd: attendeesAdd,
    reduxAttendeesDelete: attendeesDelete,
    reduxAttendeesEdit: attendeesEdit,
    reduxGroupsAddFromXlxs: groupsAddFromXlxs,
    reduxAttendeesAddFromXlxs: attendeesAddFromXlxs
  }
)(Attendees);
