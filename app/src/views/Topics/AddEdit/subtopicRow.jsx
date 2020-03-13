import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { validateSubtopic, validateObjectives, validateRepositories } from '../../../validators';
import Error from '../../../components/Common/SVG/error';
import ObjectiveRow from './objectiveRow';
import Plus from '../../../components/Common/SVG/plus';
import ObjectivesModal from './objectivesModal';

class SubtopicRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      objectivesModal: false,
      selected: {}
    };
    this.clickCheckboxModal = this.clickCheckboxModal.bind(this);
    this.bindObjectives = this.bindObjectives.bind(this);
  }

  clickCheckboxModal(id, e) {
    const { selected } = this.state;
    const selectedAux = Object.assign({}, selected);
    selectedAux[id] = e.target.checked;
    Object.keys(selectedAux).forEach(singleSelect => {
      if (selectedAux[singleSelect] === false) {
        delete selectedAux[singleSelect];
      }
    });
    this.setState({
      selected: selectedAux
    });
  }

  bindObjectives() {
    const { addSubtopicsObjectives, subtopic } = this.props;
    const { id } = subtopic;
    const { selected } = this.state;
    if (addSubtopicsObjectives) addSubtopicsObjectives(id, selected);
    this.setState({
      selected: {},
      objectivesModal: false
    });
  }

  render() {
    const {
      subtopic,
      removeSubtopic,
      objectives,
      removeSubtopicObjective,
      repositories
    } = this.props;
    const { objectives: subtopicObjectives } = subtopic;
    const { name, id } = subtopic;
    const { visible, objectivesModal, selected } = this.state;
    return (
      <React.Fragment>
        <tr className="topics-subtopics-table-row-top">
          <td style={{ fontWeight: 'bold' }}>
            {' '}
            <Button
              className="topics-subtopics-table-visible custom-shadow"
              onClick={() => this.setState({ visible: !visible })}
            >
              {visible ? '-' : '+'}
            </Button>
            {name}
          </td>
          <td style={{ width: '130px', textAlign: 'center' }}>
            <div
              tabIndex={id}
              role="button"
              className="custom-shadow noselect"
              style={{
                margin: 'auto',
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                borderRadius: '100px'
              }}
              onKeyUp={() => removeSubtopic(id)}
              onClick={() => removeSubtopic(id)}
            >
              <Error />
            </div>
          </td>
        </tr>
        {visible && (
          <tr className="topics-subtopics-table-row-bottom">
            <td colSpan="3">
              <Table className="topics-subtopics-objectives-table" size="sm">
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'left' }}>
                      Objetivos
                    </th>
                    <th>
                      <div
                        tabIndex={id}
                        role="button"
                        className="custom-shadow noselect"
                        style={{
                          margin: 'auto',
                          width: '25px',
                          height: '25px',
                          cursor: 'pointer',
                          borderRadius: '100px'
                        }}
                        onKeyUp={() => this.setState({ objectivesModal: true })}
                        onClick={() => this.setState({ objectivesModal: true })}
                      >
                        <Plus />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subtopicObjectives &&
                    subtopicObjectives
                      .map(subtopicObjectivesId =>
                        objectives.find(objective => objective.id === subtopicObjectivesId)
                      )
                      .map(objective => (
                        <ObjectiveRow
                          repositories={objective.repositories.map(repositoryId =>
                            repositories.find(repository => repository.id === repositoryId)
                          )}
                          id={id}
                          removeSubtopicObjective={removeSubtopicObjective}
                          objective={objective}
                          key={objective.id}
                        />
                      ))}
                </tbody>
              </Table>
            </td>
          </tr>
        )}
        <ObjectivesModal
          clickCheckboxModal={this.clickCheckboxModal}
          bindObjectives={this.bindObjectives}
          selected={selected}
          closeModal={() =>
            this.setState({
              objectivesModal: false
            })
          }
          modal={objectivesModal}
          objectives={objectives}
          subtopic={subtopic}
        />
      </React.Fragment>
    );
  }
}

SubtopicRow.propTypes = {
  subtopic: validateSubtopic.isRequired,
  removeSubtopic: PropTypes.func.isRequired,
  objectives: validateObjectives.isRequired,
  removeSubtopicObjective: PropTypes.func.isRequired,
  repositories: validateRepositories.isRequired,
  addSubtopicsObjectives: PropTypes.func.isRequired
};

export default SubtopicRow;
