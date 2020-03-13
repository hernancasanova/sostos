import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import ItemsList from '../../components/Common/ItemsList';
import AddEdit from '../../components/Common/AddEdit';
import Item from './Item';
import {
  validateHistory,
  validateGroups,
  validateMatch,
  validateAttendees
} from '../../validators';
import {
  groupsAdd,
  groupsDelete,
  groupsUnbindAttendees,
  groupsBindAttendees,
  groupsEdit
} from '../../actions/GroupsActions';
import { attendeesAdd } from '../../actions/AttendeesActions';
import { validateText } from '../../formValidators';

// #region Fields and Columns
const fieldsAdd = [
  {
    label: 'Nombre',
    value: 'name',
    type: 'text',
    validation: validateText
  },
  {
    label: 'Observación',
    value: 'observation',
    type: 'text'
  }
];

const columns = [
  {
    label: 'Nombre',
    value: 'name'
  },
  {
    label: 'Asistentes',
    value: 'attendees'
  },
  {
    label: 'Observación',
    value: 'observation'
  }
];
// #endregion

const Groups = props => {
  const {
    history,
    groups,
    reduxGroupsAdd,
    reduxGroupsDelete,
    match,
    attendees,
    reduxGroupsUnbindAttendees,
    reduxGroupsBindAttendees,
    reduxGroupsEdit,
    selectedInstitution,
    reduxAttendeesAdd
  } = props;
  const { params } = match;
  const { id } = params;
  const itemId = parseInt(id, 10);
  let item = groups.find(group => group.id === itemId);
  item = item || false;
  const { institution } = item;
  if (institution !== selectedInstitution) {
    item = false;
  }
  return (
    <MainContent token aside>
      <Switch>
        <Route exact path={PATHS.GROUPS}>
          <ItemsList
            title="Administrar Grupos"
            addItemText="Agregar Grupo"
            addItemUrl={PATHS.GROUPS_ADD}
            deleteItemText="Eliminar Grupo"
            deleteItemFunction={reduxGroupsDelete}
            history={history}
            selectedInstitution={selectedInstitution}
            items={groups}
            singleItemUrl={PATHS.GROUPS_PRE_SINGLE}
            columns={columns}
            deleteItemMessage="Grupos eliminados exitosamente"
          />
        </Route>
        <Route exact path={PATHS.GROUPS_ADD}>
          <AddEdit
            selectedInstitution={selectedInstitution}
            addItemFunction={reduxGroupsAdd}
            addItemFunctionCallback={() => history.push(PATHS.GROUPS)}
            addItemMessage="El grupo fue creado correctamente"
            title="Agregar Grupo"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        <Route exact path={`${PATHS.GROUPS_EDIT}:id`}>
          <AddEdit
            itemRequired
            item={item}
            itemRequiredUrl={PATHS.GROUPS}
            selectedInstitution={selectedInstitution}
            addItemFunction={reduxGroupsEdit}
            addItemMessage="El grupo fue editado correctamente"
            title="Editar Grupo"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        <Route exact path={`${PATHS.GROUPS_PRE_SINGLE}:id`}>
          <Item
            attendeesAdd={reduxAttendeesAdd}
            selectedInstitution={selectedInstitution}
            attendees={attendees}
            history={history}
            group={item}
            list={item.list}
            groupsBindAttendees={reduxGroupsBindAttendees}
            groupsUnbindAttendees={reduxGroupsUnbindAttendees}
          />
        </Route>
      </Switch>
    </MainContent>
  );
};

Groups.propTypes = {
  history: validateHistory.isRequired,
  groups: validateGroups.isRequired,
  reduxGroupsAdd: PropTypes.func.isRequired,
  reduxGroupsDelete: PropTypes.func.isRequired,
  match: validateMatch.isRequired,
  attendees: validateAttendees.isRequired,
  reduxGroupsUnbindAttendees: PropTypes.func.isRequired,
  reduxGroupsBindAttendees: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  reduxGroupsEdit: PropTypes.func.isRequired,
  reduxAttendeesAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups,
  attendees: state.attendees,
  selectedInstitution: state.institutions.selectedInstitution
});

export default connect(
  mapStateToProps,
  {
    reduxGroupsAdd: groupsAdd,
    reduxGroupsDelete: groupsDelete,
    reduxGroupsUnbindAttendees: groupsUnbindAttendees,
    reduxGroupsBindAttendees: groupsBindAttendees,
    reduxGroupsEdit: groupsEdit,
    reduxAttendeesAdd: attendeesAdd
  }
)(Groups);
