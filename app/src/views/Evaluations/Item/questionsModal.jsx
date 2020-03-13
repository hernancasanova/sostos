import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ItemsTable from '../../../components/Common/ItemsList/itemsTable';
import Select from '../../../components/form/Select';
import { validateQuestions, validateEvaluation, validateTopics } from '../../../validators';

const numericToDifficulty = number => {
  switch (number) {
    case -1:
      return 'Fácil';
    case 1:
      return 'Dificil';
    default:
      return 'Normal';
  }
};

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

// const AttendeesModal = props => {
class QuestionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: '',
      topic: 0,
      subtopic: 0,
      difficulty: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searching: e.target.value
    });
  }

  render() {
    const {
      modal,
      closeModal,
      clickCheckboxModal,
      questions,
      evaluation,
      bindAttendees,
      topics
    } = this.props;
    const { searching, topic, subtopic, difficulty } = this.state;
    const topicOptions = [
      {
        value: 0,
        label: 'Todos los temas'
      }
    ].concat(
      topics.map(topicMap => {
        return {
          value: topicMap.id,
          label: topicMap.name
        };
      })
    );
    const topicSelected = topics.find(topicFind => topicFind.id === topic);
    const subtopicsOptions =
      topicSelected && topicSelected.subtopics.length > 0
        ? [
            {
              value: 0,
              label: 'Todos los subtemas'
            }
          ].concat(
            topicSelected.subtopics.map(subtopicMap => {
              return {
                label: subtopicMap.name,
                value: subtopicMap.id
              };
            })
          )
        : [
            {
              value: 0,
              label: topic === 0 ? 'Todos los subtemas' : 'Tema sin subtemas'
            }
          ];
    const subtopicsOptionsSelected = subtopicsOptions.find(
      subtopicOption => subtopicOption.value === subtopic
    );
    const difficultyOptions = [
      {
        value: 0,
        label: 'Todas las complejidades'
      },
      {
        value: 1,
        label: 'Fácil'
      },
      {
        value: 2,
        label: 'Normal'
      },
      {
        value: 3,
        label: 'Dificil'
      }
    ];
    return (
      <Modal size="xl" className="group-attendees-modal" show={modal} onHide={closeModal}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title custom-modal-title-text">
            Agregar preguntas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="group-attendees-modal-body">
          <Row>
            <Col>
              <Select
                slim
                value={topic}
                onChange={e => this.setState({ topic: e, subtopic: 0 })}
                options={topicOptions}
              />
            </Col>
            <Col>
              <Select
                slim
                disabled
                value={subtopicsOptionsSelected.value}
                onChange={e => this.setState({ subtopic: e })}
                options={subtopicsOptions}
              />
            </Col>
            <Col>
              <Select
                slim
                value={0}
                onChange={e => this.setState({ difficulty: e })}
                options={difficultyOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="9">
              <input
                onChange={this.handleChange}
                value={searching}
                type="text"
                className="form-control"
                placeholder="Buscar"
              />
            </Col>
            <Col lg="3">
              <button style={{ width: '100%' }} type="button" className="NewButton">
                Nueva Pregunta
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemsTable
                noFilter
                mainColumn="code"
                onClick={clickCheckboxModal}
                columns={[
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
                ]}
                url=""
                items={questions
                  // #region Filtra preguntas que ya están
                  .filter(
                    question =>
                      evaluation.questions.indexOf(question.id) === -1 &&
                      `${question.code.toLowerCase()} ${question.title.toLowerCase()}`.includes(
                        searching.trim().toLowerCase()
                      )
                  )
                  // #endregion
                  // #region Filtro de preguntas
                  .filter(question => {
                    // #region Filtro por topic
                    if (topic !== 0 && question.topic !== topic) {
                      return false;
                    }
                    // #endregion
                    // #region Filtro por subtopic
                    if (subtopic !== 0 && question.subtopic !== subtopic) {
                      return false;
                    }
                    // #endregion
                    // #region Filtro por dificultad
                    if (difficulty !== 0 && question.difficulty !== difficulty - 2) {
                      return false;
                    }
                    // #endregion
                    let visible = false;
                    // #region Filtro por texto dentro de los campos
                    columns.forEach(column => {
                      if (!visible && typeof question[column.value] !== 'undefined') {
                        visible =
                          visible ||
                          question[column.value]
                            .toString()
                            .trim()
                            .toLowerCase()
                            .includes(searching.trim().toLocaleLowerCase());
                      }
                    });
                    // #endregion
                    return visible;
                  })
                  // #endregion
                  // #region Del resultado anterior arma objetos nuevos para mostrar
                  .map(question => {
                    // #region Busca el topic y subtopic de la pregunta de la lista
                    const questionTopic = topics.find(topicFind => topicFind.id === question.topic);
                    const questionSubtopic =
                      questionTopic && questionTopic.subtopics && questionTopic.subtopics.length > 0
                        ? questionTopic.subtopics.find(
                            subtopicFind => subtopicFind.id === question.subtopic
                          )
                        : false;
                    // #endregion
                    // #region Devuelve el objeto final a mostrar como item en la tabla
                    return Object.assign({}, question, {
                      difficulty: numericToDifficulty(question.difficulty),
                      topic: questionTopic ? questionTopic.name : '',
                      subtopic: questionSubtopic ? questionSubtopic.name : ''
                    });
                    // #endregion
                  })}
                // #endregion
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button className="custom-modal-accept-button" variant="primary" onClick={bindAttendees}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

QuestionsModal.propTypes = {
  bindAttendees: PropTypes.func.isRequired,
  clickCheckboxModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  questions: validateQuestions.isRequired,
  evaluation: validateEvaluation.isRequired,
  topics: validateTopics.isRequired
};

export default QuestionsModal;
