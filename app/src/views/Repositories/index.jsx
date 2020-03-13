import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import List from './List';
import Book from './List/book';
import AddEdit from '../../components/Common/AddEdit';
import { repositoriesAdd, repositoriesDelete } from '../../actions/RepositoriesActions';
import { validateHistory, validateRepositories, validateMatch } from '../../validators';
import { validateText } from '../../formValidators';
import Item from './Item';
import File from './File';
import Create from './Create';
import Formula from './Formula';

// #region Fields
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
    type: 'text'
  }
];
// #endregion

const Repositories = props => {
  const {
    token,
    match,
    history,
    repositories,
    reduxRepositoriesAdd,
    reduxRepositoriesDelete,
    selectedInstitution
  } = props;
  const { params } = match;
  const { id } = params;
  const repositoryId = parseInt(id, 10);
  let singleRepository = repositories.find(repository => repository.id === repositoryId);
  singleRepository = singleRepository || false;
  return (
    <MainContent token={token} aside>
      <Switch>
        <Route exact path={PATHS.REPOSITORIES}>
          <List
            deleteItemFunction={reduxRepositoriesDelete}
            history={history}
            cards={repositories.map(repository => {
              const { name, description, colour, files, id } = repository;
              return {
                id,
                icon: <Book colour={colour} />,
                name,
                files,
                description,
                url: `${PATHS.REPOSITORIES_PRE_SINGLE}${repository.id}`
              };
            })}
          />
        </Route>
        <Route exact path={PATHS.REPOSITORIES_ADD}>
          <AddEdit
            selectedInstitution={selectedInstitution}
            addItemFunctionCallback={() => history.push(PATHS.REPOSITORIES)}
            addItemFunction={reduxRepositoriesAdd}
            addItemMessage="El repositorio fue creado correctamente"
            title="Agregar Repositorio"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        <Route exact path={PATHS.REPOSITORIES_CREATE}>
          <Create history={history} />
        </Route>
        <Route exact path={PATHS.REPOSITORIES_FORMULA}>
          <Formula history={history} />
        </Route>
        <Route path={`${PATHS.REPOSITORIES_PRE_SINGLE}:id`} exact>
          <Item repository={singleRepository} history={history} />
        </Route>
        <Route exact path={PATHS.FILES}>
          <File history={history} name="Guia Unidad I" />
        </Route>
      </Switch>
    </MainContent>
  );
};

Repositories.propTypes = {
  token: PropTypes.string.isRequired,
  history: validateHistory.isRequired,
  repositories: validateRepositories.isRequired,
  reduxRepositoriesAdd: PropTypes.func.isRequired,
  reduxRepositoriesDelete: PropTypes.func.isRequired,
  match: validateMatch.isRequired,
  selectedInstitution: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  repositories: state.repositories,
  token: state.auth.token,
  selectedInstitution: state.institutions.selectedInstitution
});

export default connect(
  mapStateToProps,
  { reduxRepositoriesAdd: repositoriesAdd, reduxRepositoriesDelete: repositoriesDelete }
)(Repositories);
