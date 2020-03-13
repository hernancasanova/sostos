import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import AddEdit from './AddEdit';
import ItemsList from './ItemList';
import {
  validateHistory,
  validateQuestions,
  validateMatch,
  validateTopics
} from '../../validators';
import { questionsAdd, questionsDelete, questionsEdit } from '../../actions/QuestionsActions';

// #region Columns
const columns = [
  {
    label: 'Código',
    value: 'code'
  },
  {
    label: 'Título',
    value: 'title'
  },
  {
    label: 'Complejidad',
    value: 'difficulty'
  },
  {
    label: 'Tema',
    value: 'topic'
  },
  {
    label: 'Subtema',
    value: 'subtopic'
  }
];
// #endregion

const Questions = props => {
  const {
    history,
    reduxQuestionsAdd,
    reduxQuestionsDelete,
    questions,
    match,
    reduxQuestionsEdit,
    selectedInstitution,
    topics
  } = props;
  const { params } = match;
  const { id } = params;
  const itemId = parseInt(id, 10);
  let item = questions.find(question => question.id === itemId);
  item = item || false;
  return (
    <MainContent token aside>
      <Switch>
        {
          // #region ItemList
          <Route exact path={PATHS.QUESTIONS}>
            <ItemsList
              topics={topics}
              selectedInstitution={selectedInstitution}
              noFilter
              mainColumn="code"
              title="Administrar Preguntas"
              addItemText="Agregar Preguntas"
              addItemUrl={PATHS.QUESTIONS_ADD}
              deleteItemText="Eliminar Preguntas"
              deleteItemFunction={reduxQuestionsDelete}
              history={history}
              items={questions}
              singleItemUrl={PATHS.QUESTIONS_PRE_SINGLE}
              columns={columns}
              deleteItemMessage="Preguntas eliminadas exitosamente"
            />
          </Route>
          // #endregion
        }
        {
          // #region Add
          <Route exact path={PATHS.QUESTIONS_ADD}>
            <AddEdit topics={topics} questionsAdd={reduxQuestionsAdd} history={history} />
          </Route>
          // #endregion
        }
        {
          // #region Edit
          <Route exact path={`${PATHS.QUESTIONS_PRE_SINGLE}:id`}>
            <AddEdit
              itemRequired
              topics={topics}
              questionsAdd={reduxQuestionsEdit}
              item={item}
              history={history}
            />
          </Route>
          // #endregion
        }
      </Switch>
    </MainContent>
  );
};

Questions.propTypes = {
  history: validateHistory.isRequired,
  reduxQuestionsAdd: PropTypes.func.isRequired,
  reduxQuestionsDelete: PropTypes.func.isRequired,
  reduxQuestionsEdit: PropTypes.func.isRequired,
  questions: validateQuestions.isRequired,
  match: validateMatch.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  topics: validateTopics.isRequired
};

const mapStateToProps = state => ({
  questions: state.questions,
  selectedInstitution: state.institutions.selectedInstitution,
  topics: state.topics
});

export default connect(
  mapStateToProps,
  {
    reduxQuestionsAdd: questionsAdd,
    reduxQuestionsDelete: questionsDelete,
    reduxQuestionsEdit: questionsEdit
  }
)(Questions);
