import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import {
  validateHistory,
  validateObjectives,
  validateMatch,
  validateRepositories
} from '../../validators';
import { validateText } from '../../formValidators';
import MainContent from '../../containers/layouts/Master/mainContent';
// import AddEdit from '../../components/Comunes/AddEdit';
import AddEdit from './AddEdit';
import PATHS from '../../paths';
import ItemsList from '../../components/Common/ItemsList';
import { objectivesAdd, objectivesDelete, objectivesEdit } from '../../actions/ObjectivesActions';

// #region fieldsAdd and columns
const fieldsAdd = [
  {
    label: 'Nombre',
    value: 'name',
    type: 'text',
    validation: validateText
  },
  {
    label: 'Descripción',
    value: 'description',
    type: 'textarea'
  },
  {
    label: 'Conocimientos previos',
    value: 'requirements',
    type: 'textarea'
  },
  {
    label: 'Palabras clave',
    value: 'keyWords',
    type: 'textarea'
  },
  {
    label: 'Conceptos y contenidos',
    value: 'concepts',
    type: 'textarea'
  }
];

const columns = [
  {
    label: 'Nombre',
    value: 'name'
  },
  {
    label: 'Descripción',
    value: 'description'
  } /* ,
  {
    label: 'Conocimientos previos',
    value: 'requirements'
  },
  {
    label: 'Palabras clave',
    value: 'keyWords'
  },
  {
    label: 'Conceptos y contenidos',
    value: 'concepts'
  } */
];
// #endregion

const Objectives = props => {
  const {
    history,
    reduxObjectivesAdd,
    reduxObjectivesDelete,
    reduxObjectivesEdit,
    objectives,
    match,
    selectedInstitution,
    repositories
  } = props;
  const { params } = match;
  const { id } = params;
  const itemId = parseInt(id, 10);
  let item = objectives.find(group => group.id === itemId);
  item = item || false;
  return (
    <MainContent token aside>
      <Switch>
        <Route exact path={PATHS.OBJECTIVES}>
          <ItemsList
            noFilter
            selectedInstitution={selectedInstitution}
            title="Administrar Objetivos"
            addItemText="Agregar Objetivo"
            addItemUrl={PATHS.OBJECTIVES_ADD}
            deleteItemText="Eliminar Objetivo"
            deleteItemFunction={reduxObjectivesDelete}
            history={history}
            items={objectives}
            singleItemUrl={PATHS.OBJECTIVES_PRE_SINGLE}
            columns={columns}
            deleteItemMessage="Objetivos eliminados exitosamente"
          />
        </Route>
        <Route exact path={PATHS.OBJECTIVES_ADD}>
          <AddEdit
            addItemFunctionCallback={() => history.push(PATHS.OBJECTIVES)}
            repositories={repositories}
            addItemFunction={reduxObjectivesAdd}
            addItemMessage="El objetivo fue creado correctamente"
            title="Agregar Objetivo"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        <Route exact path={`${PATHS.OBJECTIVES_PRE_SINGLE}:id`}>
          <AddEdit
            itemRequired
            repositories={repositories}
            item={item}
            addItemFunction={reduxObjectivesEdit}
            addItemMessage="El objetivo fue editado correctamente"
            title="Editar Objetivo"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
      </Switch>
    </MainContent>
  );
};
Objectives.propTypes = {
  history: validateHistory.isRequired,
  reduxObjectivesAdd: PropTypes.func.isRequired,
  reduxObjectivesDelete: PropTypes.func.isRequired,
  reduxObjectivesEdit: PropTypes.func.isRequired,
  objectives: validateObjectives.isRequired,
  match: validateMatch.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  repositories: validateRepositories.isRequired
};

const mapStateToProps = state => ({
  objectives: state.objectives,
  selectedInstitution: state.institutions.selectedInstitution,
  repositories: state.repositories
});

export default connect(
  mapStateToProps,
  {
    reduxObjectivesAdd: objectivesAdd,
    reduxObjectivesDelete: objectivesDelete,
    reduxObjectivesEdit: objectivesEdit
  }
)(Objectives);
