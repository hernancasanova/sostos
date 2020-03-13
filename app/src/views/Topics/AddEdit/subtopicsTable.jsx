import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import SubtopicRow from './subtopicRow';
import { validateSubtopics, validateObjectives, validateRepositories } from '../../../validators';

// eslint-disable-next-line react/prefer-stateless-function
class SubtopicsTable extends Component {
  render() {
    const {
      subtopics,
      removeSubtopic,
      objectives,
      removeSubtopicObjective,
      addSubtopicsObjectives,
      repositories
    } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Table className="topics-subtopics-table" bordered>
              <tbody>
                {subtopics.map(subtopic => (
                  <SubtopicRow
                    addSubtopicsObjectives={addSubtopicsObjectives}
                    key={subtopic.id}
                    objectives={objectives}
                    removeSubtopicObjective={removeSubtopicObjective}
                    removeSubtopic={removeSubtopic}
                    subtopic={subtopic}
                    repositories={repositories}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

SubtopicsTable.propTypes = {
  subtopics: validateSubtopics.isRequired,
  removeSubtopic: PropTypes.func.isRequired,
  objectives: validateObjectives.isRequired,
  removeSubtopicObjective: PropTypes.func.isRequired,
  repositories: validateRepositories.isRequired,
  addSubtopicsObjectives: PropTypes.func.isRequired
};

export default SubtopicsTable;
