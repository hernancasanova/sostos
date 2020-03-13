import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import ItemsList from '../../components/Common/ItemsList';
import { topicsAdd, topicsDelete, topicsEdit } from '../../actions/TopicsActions';
import AddEdit from './AddEdit';
import {
  validateHistory,
  validateTopics,
  validateObjectives,
  validateMatch,
  validateQuestions,
  validateRepositories
} from '../../validators';
import { validateText } from '../../formValidators';

// #region columns and fieldsAdd
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
    label: 'Preguntas',
    value: 'questions'
  }
  /* ,{
    label: 'Observación',
    value: 'observation'
  } */
];

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
  } /* ,
  {
    label: 'Aprendizajes esperados',
    value: 'expectedLearning',
    type: 'textarea'
  } */
];
// #endregion

const Topics = props => {
  // #region Variables from props
  const {
    token,
    history,
    topics,
    reduxTopicsAdd,
    reduxTopicsDelete,
    reduxTopicsEdit,
    objectives,
    match,
    selectedInstitution,
    questions,
    repositories
  } = props;
  const { params } = match;
  const { id } = params;
  // #endregion
  const itemId = parseInt(id, 10);
  let item = topics.find(group => group.id === itemId);
  item = item || false;
  return (
    <MainContent token={token} aside>
      <Switch>
        <Route exact path={PATHS.TOPICS}>
          <ItemsList
            noFilter
            selectedInstitution={selectedInstitution}
            title="Administrar Temas"
            addItemText="Agregar Tema"
            addItemUrl={PATHS.TOPICS_ADD}
            deleteItemText="Eliminar Tema"
            deleteItemFunction={reduxTopicsDelete}
            history={history}
            items={topics.map(topic => {
              const { name, id: topicId, description } = topic;
              return {
                name,
                questions: questions.filter(question => question.topic === topicId).length,
                description,
                id: topicId
              };
            })}
            singleItemUrl={PATHS.TOPICS_PRE_SINGLE}
            columns={columns}
            deleteItemMessage="Temas eliminados exitosamente"
          />
        </Route>
        <Route exact path={PATHS.TOPICS_ADD}>
          <AddEdit
            repositories={repositories}
            objectives={objectives}
            addItemFunctionCallback={() => history.push(PATHS.TOPICS)}
            addItemFunction={reduxTopicsAdd}
            addItemMessage="El tema fue creado correctamente"
            title="Agregar Tema"
            fields={fieldsAdd}
            history={history}
            selectedInstitution={selectedInstitution}
          />
        </Route>
        <Route exact path={`${PATHS.TOPICS_PRE_SINGLE}:id`}>
          <AddEdit
            repositories={repositories}
            itemRequired
            item={item}
            objectives={objectives}
            addItemFunction={reduxTopicsEdit}
            addItemMessage="El tema fue editado correctamente"
            title="Editar Tema"
            fields={fieldsAdd}
            history={history}
            selectedInstitution={selectedInstitution}
          />
        </Route>
      </Switch>
    </MainContent>
  );
};

Topics.propTypes = {
  token: PropTypes.string.isRequired,
  history: validateHistory.isRequired,
  reduxTopicsAdd: PropTypes.func.isRequired,
  reduxTopicsDelete: PropTypes.func.isRequired,
  topics: validateTopics.isRequired,
  objectives: validateObjectives.isRequired,
  reduxTopicsEdit: PropTypes.func.isRequired,
  match: validateMatch.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  questions: validateQuestions.isRequired,
  repositories: validateRepositories.isRequired
};

const mapStateToProps = state => ({
  topics: state.topics,
  token: state.auth.token,
  selectedInstitution: state.institutions.selectedInstitution,
  objectives: state.objectives,
  questions: state.questions,
  repositories: state.repositories
});

export default connect(
  mapStateToProps,
  {
    reduxTopicsAdd: topicsAdd,
    reduxTopicsDelete: topicsDelete,
    reduxTopicsEdit: topicsEdit
  }
)(Topics);
