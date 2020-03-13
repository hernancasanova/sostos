import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import GoBack from '../../../components/GoBack';
import {
  validateHistory,
  validateEvaluations,
  validateGroups,
  validateQuestions
} from '../../../validators';
import Select from '../../../components/form/Select';
import NewButton from '../../../components/Buttons/NewButton';
import AsignationRow from './asignationRow';

// eslint-disable-next-line react/prefer-stateless-function
class Asignations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvaluation: 0,
      selectedGroup: 0
    };
    this.handleEvalautionChange = this.handleEvalautionChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handleGroupChange(selectedGroup) {
    this.setState({
      selectedGroup
    });
  }

  handleEvalautionChange(selectedEvaluation) {
    this.setState({
      selectedEvaluation
    });
  }

  render() {
    const {
      history,
      evaluations,
      groups,
      selectedInstitution,
      asignationsAdd,
      questions,
      asignations,
      attendees
    } = this.props;
    const { selectedEvaluation, selectedGroup } = this.state;
    // #region evaluation
    const evaluation =
      selectedEvaluation === 0
        ? false
        : evaluations.find(evaluationFind => evaluationFind.id === selectedEvaluation);
    // #endregion
    // #region evaluationQuestions
    const evaluationQuestions = evaluation
      ? evaluation.questions.map(questionId =>
          questions.find(question => question.id === questionId)
        )
      : [];
    // #endregion
    // #region group
    const group =
      selectedGroup === 0 ? false : groups.find(groupFind => groupFind.id === selectedGroup);
    const attendeesAsignation = (group ? group.attendees : []).map(attendeeId =>
      attendees.find(attendeeFind => attendeeFind.id === attendeeId)
    );
    // #endregion
    if (attendeesAsignation.length > 0 && evaluationQuestions.length > 0) {
      console.log('attendees');
      console.log(attendeesAsignation);
      console.log('evaluationQuestions');
      console.log(evaluationQuestions);
    }
    console.log('Evaluations ↓');
    console.log(evaluations);
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Asignaciones</h3>
          </Col>
        </Row>
        <Row>
          <Col lg="5">
            <Select
              value={selectedEvaluation}
              onChange={this.handleEvalautionChange}
              options={
                evaluations
                  ? [
                      {
                        label: 'Seleccione Evaluación',
                        value: 0
                      }
                    ].concat(
                      evaluations
                        .filter(
                          evaluationFilter => evaluationFilter.institution === selectedInstitution
                        )
                        .map(evaluationMap => {
                          return { label: evaluationMap.name, value: evaluationMap.id };
                        })
                    )
                  : [
                      {
                        label: 'Seleccione Evaluación',
                        value: 0
                      }
                    ]
              }
            />
          </Col>
          <Col lg="5">
            <Select
              value={selectedGroup}
              onChange={this.handleGroupChange}
              options={
                groups
                  ? [
                      {
                        label: 'Seleccione Grupo',
                        value: 0
                      }
                    ].concat(
                      groups
                        .filter(groupFilter => groupFilter.institution === selectedInstitution)
                        .map(groupMap => {
                          return { label: groupMap.name, value: groupMap.id };
                        })
                    )
                  : [
                      {
                        label: 'Seleccione Grupo',
                        value: 0
                      }
                    ]
              }
            />
          </Col>
          <Col lg="2">
            <NewButton
              disabled={selectedEvaluation === 0 || selectedGroup === 0}
              text="Asignar"
              onClick={() =>
                asignationsAdd(group, attendeesAsignation, evaluation, evaluationQuestions)
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="sosto-table">
              <thead>
                <tr>
                  <th>Evaluación</th>
                  <th>Preguntas</th>
                  <th>Grupo</th>
                  <th style={{ width: '100px' }}>Asistentes</th>
                  <th>Fecha</th>
                  {false && <th>Acción</th>}
                </tr>
              </thead>
              <tbody>
                {asignations &&
                  asignations.map(asignation => (
                    <AsignationRow key={asignation.id} asignation={asignation} />
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

Asignations.propTypes = {
  history: validateHistory.isRequired,
  evaluations: validateEvaluations.isRequired,
  groups: validateGroups.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  asignationsAdd: PropTypes.func.isRequired,
  questions: validateQuestions.isRequired
};

export default Asignations;
