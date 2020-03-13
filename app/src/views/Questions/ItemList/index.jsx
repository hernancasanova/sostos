import React, { Component } from 'react';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import NewButton from '../../../components/Buttons/NewButton';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import ItemsTableQuestions from '../../../components/Common/ItemsList/itemsTableQuestions';
import Select from '../../../components/form/Select';
import GoBack from '../../../components/GoBack';
import {
  validateHistory,
  validateGroups,
  validateColumns,
  validateAttendees,
  validateTopics
} from '../../../validators';
import OkSVG from '../../../components/Common/SVG/ok';

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

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      modal: false,
      searching: '',
      topic: 0,
      subtopic: 0,
      difficulty: 0
    };
    this.clickCheckbox = this.clickCheckbox.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  openModal() {
    const { deleteItemFunction } = this.props;
    const { selected } = this.state;
    deleteItemFunction(
      Object.keys(selected)
        .filter(select => selected[select] === true)
        .map(id => parseInt(id, 10))
    );
    this.setState({
      modal: true,
      selected: {}
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  clickCheckbox(id, e) {
    const { selected } = this.state;
    const selectedAux = Object.assign({}, selected);
    selectedAux[id] = e.target.checked;
    this.setState({
      selected: selectedAux
    });
  }

  handleChange(e) {
    this.setState({
      searching: e.target.value
    });
  }

  render() {
    const {
      items,
      singleItemUrl,
      history,
      title,
      deleteItemText,
      addItemText,
      addItemUrl,
      columns,
      deleteItemMessage,
      selectedInstitution,
      noFilter,
      mainColumn,
      topics
    } = this.props;
    const { modal, selected, searching, topic, subtopic, difficulty } = this.state;
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
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{title}</h3>
          </Col>
        </Row>
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
        <Row className="itemlist-controls-container">
          <Col>
            <input
              onChange={this.handleChange}
              value={searching}
              type="text"
              className="form-control"
              placeholder="Buscar..."
            />
          </Col>
          <Col className="pr-0">
            <DeleteButton
              style={{ marginLeft: '16px' }}
              className="float-right MyEnterprisesNewButton button-delete-institution custom-shadow"
              text={deleteItemText}
              disabled={!Object.keys(selected).find(select => selected[select] === true)}
              onClick={this.openModal}
            />
            <NewButton
              className="float-right MyEnterprisesNewButton  boton-agregar-institucion custom-shadow"
              text={addItemText}
              url={addItemUrl}
            />
          </Col>
        </Row>
        <Row>
          <Col className="pr-0">
            <ItemsTableQuestions
              mainColumn={mainColumn}
              noFilter={noFilter}
              onClick={this.clickCheckbox}
              url={singleItemUrl}
              columns={columns}
              selected={selected}
              selectedInstitution={selectedInstitution}
              items={items
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
        <Modal show={modal} onHide={this.closeModal}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title className="custom-modal-title">
              <OkSVG />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">{deleteItemMessage}</Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button
              className="custom-modal-accept-button custom-shadow"
              variant="primary"
              onClick={this.closeModal}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

ItemsList.defaultProps = {
  noFilter: false,
  mainColumn: 'name'
};

ItemsList.propTypes = {
  items: PropTypes.oneOfType([validateGroups, validateAttendees]).isRequired,
  history: validateHistory.isRequired,
  title: PropTypes.string.isRequired,
  deleteItemText: PropTypes.string.isRequired,
  addItemText: PropTypes.string.isRequired,
  addItemUrl: PropTypes.string.isRequired,
  singleItemUrl: PropTypes.string.isRequired,
  columns: validateColumns.isRequired,
  deleteItemFunction: PropTypes.func.isRequired,
  deleteItemMessage: PropTypes.string.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  noFilter: PropTypes.bool,
  mainColumn: PropTypes.string,
  topics: validateTopics.isRequired
};

export default ItemsList;
