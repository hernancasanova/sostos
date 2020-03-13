import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MainContent from '../../containers/layouts/Master/mainContent';
import PATHS from '../../paths';
import ItemsList from '../../components/Common/ItemsList';
import {
  validateHistory,
  validateEvaluations,
  validateMatch,
  validateQuestions,
  validateTopics,
  validateGroups,
  validateAttendees
} from '../../validators';
import Item from './Item';
import AddEdit from '../../components/Common/AddEdit';
import Asignations from './Asignations';
import {
  evaluationsAdd,
  evaluationsDelete,
  evaluationsUnbindQuestions,
  evaluationsBindQuestions
} from '../../actions/EvaluationsActions';
import { asignationsAdd } from '../../actions/AsignationsActions';
import NewButton from '../../components/Buttons/NewButton';

// #region Fields and Columns
const fieldsAdd = [
  {
    label: 'Nombre',
    value: 'name',
    type: 'text'
  },
  {
    label: 'Observación',
    value: 'observation',
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
    label: 'Nombre',
    value: 'name'
  },
  {
    label: 'Preguntas',
    value: 'questions'
  },
  {
    label: 'Observación',
    value: 'observation'
  }
];
// #endregion

const Evaluations = props => {
  const {
    token,
    history,
    evaluations,
    questions,
    selectedInstitution,
    match,
    reduxEvaluationsAdd,
    reduxEvaluationsDelete,
    reduxEvaluationsUnbindQuestions,
    reduxEvaluationsBindQuestions,
    reduxAsignationsAdd,
    topics,
    asignations,
    attendees,
    groups
  } = props;
  const { params } = match;
  const { id } = params;
  const itemId = parseInt(id, 10);
  let item = evaluations.find(evaluation => evaluation.id === itemId);
  const institution = item ? item.institution : false;
  if (institution !== selectedInstitution) {
    item = false;
  }
  return (
    <MainContent token={token} aside>
      <Switch>
        <Route exact path={PATHS.EVALUATIONS}>
          <ItemsList
            extraButton={
              <NewButton
                className="MyEnterprisesNewButton extra-button-evaluations-list boton-agregar-institucion float-right custom-shadow"
                text="Asignar Evaluación"
                url={PATHS.EVALUATIONS_ASIGNATIONS}
              />
            }
            selectedInstitution={selectedInstitution}
            title="Administrar Evaluaciones"
            addItemText="Agregar Evaluacion"
            addItemUrl={PATHS.EVALUATIONS_ADD}
            deleteItemText="Eliminar Evaluacion"
            deleteItemFunction={reduxEvaluationsDelete}
            history={history}
            items={evaluations}
            singleItemUrl={PATHS.EVALUATIONS_PRE_SINGLE}
            columns={columns}
            deleteItemMessage="Evaluaciones eliminados exitosamente"
          />
        </Route>
        <Route exact path={PATHS.EVALUATIONS_ASIGNATIONS}>
          <Asignations
            asignations={asignations}
            questions={questions}
            asignationsAdd={reduxAsignationsAdd}
            selectedInstitution={selectedInstitution}
            groups={groups}
            evaluations={evaluations}
            history={history}
            attendees={attendees}
          />
        </Route>
        <Route exact path={PATHS.EVALUATIONS_ADD}>
          <AddEdit
            addItemFunctionCallback={() => history.push(PATHS.EVALUATIONS)}
            selectedInstitution={selectedInstitution}
            addItemFunction={reduxEvaluationsAdd}
            addItemMessage="La evaluación fue creada correctamente"
            title="Agregar Evaluación"
            fields={fieldsAdd}
            history={history}
          />
        </Route>
        {item && (
          <Route exact path={`${PATHS.EVALUATIONS_PRE_SINGLE}:id`}>
            <Item
              topics={topics}
              history={history}
              evaluationsBindQuestions={reduxEvaluationsBindQuestions}
              evaluationsUnbindQuestions={reduxEvaluationsUnbindQuestions}
              questions={questions}
              evaluation={item}
            />
          </Route>
        )}
      </Switch>
    </MainContent>
  );
};

Evaluations.propTypes = {
  token: PropTypes.string.isRequired,
  history: validateHistory.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  evaluations: validateEvaluations.isRequired,
  match: validateMatch.isRequired,
  reduxEvaluationsAdd: PropTypes.func.isRequired,
  reduxEvaluationsDelete: PropTypes.func.isRequired,
  reduxEvaluationsUnbindQuestions: PropTypes.func.isRequired,
  reduxEvaluationsBindQuestions: PropTypes.func.isRequired,
  questions: validateQuestions.isRequired,
  reduxAsignationsAdd: PropTypes.func.isRequired,
  topics: validateTopics.isRequired,
  groups: validateGroups.isRequired,
  attendees: validateAttendees.isRequired
};

const mapStateToProps = state => ({
  evaluations: state.evaluations,
  token: state.auth.token,
  selectedInstitution: state.institutions.selectedInstitution,
  questions: state.questions,
  topics: state.topics,
  groups: state.groups,
  asignations: state.asignations,
  attendees: state.attendees
});

export default connect(
  mapStateToProps,
  {
    reduxEvaluationsAdd: evaluationsAdd,
    reduxEvaluationsDelete: evaluationsDelete,
    reduxEvaluationsUnbindQuestions: evaluationsUnbindQuestions,
    reduxEvaluationsBindQuestions: evaluationsBindQuestions,
    reduxAsignationsAdd: asignationsAdd
  }
)(Evaluations);
