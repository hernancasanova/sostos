import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import ItemsList from '../../components/Common/ItemsList';
import AddEdit from '../../components/Common/AddEdit';

import { validateInstitutions, validateMatch, validateHistory } from '../../validators';
import {
  institutionsAdd,
  institutionsDelete,
  institutionsEdit
} from '../../actions/InstitutionsActions';
import { validateText } from '../../formValidators';

// #region FieldsAdd and Columns
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
    type: 'text',
    validation: validateText
  },
  {
    label: 'País',
    value: 'country',
    type: 'text',
    validation: validateText
  },
  {
    label: 'Ciudad',
    value: 'city',
    type: 'text',
    validation: validateText
  },
  {
    label: 'Código Postal',
    value: 'postal',
    type: 'text'
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
  },
  {
    label: 'País',
    value: 'country'
  },
  {
    label: 'Ciudad',
    value: 'city'
  },
  {
    label: 'Código Postal',
    value: 'postal'
  }
];
// #endregion

const Institutions = props => {
  const {
    history,
    institutions,
    reduxInstitutionsAdd,
    reduxInstitutionsDelete,
    reduxInstitutionsEdit,
    selectedInstitution,
    match
  } = props;
  const { params } = match;
  const { id } = params;
  const itemId = parseInt(id, 10);
  let singleItem = institutions.find(institution => institution.id === itemId);
  singleItem = singleItem || false;
  return (
    <MainContent token aside>
      <Switch>
        <Route exact path={PATHS.INSTITUTIONS}>
          <ItemsList
            noFilter
            title="Administrar Instituciones"
            addItemText="Agregar Institución"
            addItemUrl={PATHS.INSTITUTIONS_ADD}
            deleteItemText="Eliminar Institución"
            deleteItemFunction={reduxInstitutionsDelete}
            history={history}
            items={institutions.sort((a, b) => {
              if (a.id > b.id) {
                return -1;
              }
              return 1;
            })}
            singleItemUrl={PATHS.INSTITUTIONS_PRE_SINGLE}
            columns={columns}
            selectedInstitution={selectedInstitution}
            deleteItemMessage="Instituciones eliminadas exitosamente"
          />
        </Route>
        <Route exact path={PATHS.INSTITUTIONS_ADD}>
          <AddEdit
            addItemFunctionCallback={() => history.push(PATHS.INSTITUTIONS)}
            addItemFunction={reduxInstitutionsAdd}
            addItemMessage="La institución fue creada correctamente"
            title="Agregar Institución"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        <Route path={`${PATHS.INSTITUTIONS_PRE_SINGLE}:id`}>
          <AddEdit
            itemRequired
            itemRequiredUrl={PATHS.INSTITUTIONS}
            item={singleItem}
            addItemFunction={reduxInstitutionsEdit}
            addItemMessage="La institución fue editada correctamente"
            title="Editar Institución"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
      </Switch>
    </MainContent>
  );
};

Institutions.propTypes = {
  institutions: validateInstitutions.isRequired,
  history: validateHistory.isRequired,
  reduxInstitutionsAdd: PropTypes.func.isRequired,
  reduxInstitutionsDelete: PropTypes.func.isRequired,
  reduxInstitutionsEdit: PropTypes.func.isRequired,
  match: validateMatch.isRequired,
  selectedInstitution: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  institutions: state.institutions.institutions,
  selectedInstitution: state.institutions.selectedInstitution
});

export default connect(
  mapStateToProps,
  {
    reduxInstitutionsAdd: institutionsAdd,
    reduxInstitutionsDelete: institutionsDelete,
    reduxInstitutionsEdit: institutionsEdit
  }
)(Institutions);
