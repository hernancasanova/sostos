import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import NewButton from '../../../components/Buttons/NewButton';
import GoBack from '../../../components/GoBack';
import {
  validateHistory,
  validateFields,
  validateTopic,
  validateObjectives,
  validateRepositories
} from '../../../validators';
import InputCustom from '../../../components/form/InputCustom';
import OkSVG from '../../../components/Common/SVG/ok';
import PATHS from '../../../paths';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import SubtopicsTable from './subtopicsTable';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    const selected = {};
    if (item && item.objectives) {
      const itemObjectives = item.objectives;
      itemObjectives.forEach(itemObjective => {
        selected[itemObjective] = true;
      });
    }
    this.state = {
      fields: Object.assign({}, item),
      errors: {},
      modal: false,
      selected,
      selectedSubtopics: {},
      subtopicModal: false,
      newSubtopic: '',
      subtopics:
        item && item.subtopics ? item.subtopics.map(subtopic => Object.assign({}, subtopic)) : []
    };
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.clickCheckbox = this.clickCheckbox.bind(this);
    this.clickCheckboxSubtopics = this.clickCheckboxSubtopics.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.clickRemoveSubtopics = this.clickRemoveSubtopics.bind(this);
    this.handleCloseSubtopicModal = this.handleCloseSubtopicModal.bind(this);
    this.clickAddSubtopic = this.clickAddSubtopic.bind(this);
    this.handleChangeSubtopic = this.handleChangeSubtopic.bind(this);
    this.removeSubtopic = this.removeSubtopic.bind(this);
    this.removeSubtopicObjective = this.removeSubtopicObjective.bind(this);
    this.addSubtopicsObjectives = this.addSubtopicsObjectives.bind(this);
  }

  componentDidMount() {
    this.checkItem();
  }

  componentDidUpdate() {
    this.checkItem();
  }

  checkItem() {
    const { itemRequired, history, item } = this.props;
    if (itemRequired && !item) {
      history.replace(PATHS.TOPICS);
    }
  }

  handleClose() {
    const { addItemFunctionCallback } = this.props;
    this.setState({
      modal: false
    });
    if (addItemFunctionCallback) addItemFunctionCallback();
  }

  handleCloseSubtopicModal() {
    this.setState({
      subtopicModal: false,
      newSubtopic: ''
    });
  }

  validate() {
    const { fields, addItemFunction, item } = this.props;
    const { fields: stateFields, selected, subtopics } = this.state;
    const errors = {};
    let allFieldsValids = true;
    fields.forEach(field => {
      if (field.validation) {
        const resultado =
          typeof stateFields[field.value] !== 'undefined' &&
          field.validation(stateFields[field.value]);
        if (!resultado) {
          errors[field.value] = `El campo '${field.label}' es requerido`;
          allFieldsValids = false;
        }
      }
    });
    if (allFieldsValids) {
      stateFields.objectives =
        typeof selected === 'undefined'
          ? []
          : Object.keys(selected)
              .filter(selectedId => selected[selectedId])
              .map(selectedId => parseInt(selectedId, 10));
      stateFields.subtopics = typeof subtopics === 'undefined' ? [] : subtopics;
      addItemFunction(stateFields);
      if (item) {
        this.setState({
          modal: true,
          errors: {}
        });
      } else {
        this.setState({
          modal: true,
          fields: {},
          errors: {}
        });
      }
    } else {
      this.setState({
        errors
      });
    }
  }

  updateState(e) {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
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

  clickCheckboxSubtopics(id, e) {
    const { selectedSubtopics } = this.state;
    const selectedSubtopicsAux = Object.assign({}, selectedSubtopics);
    selectedSubtopicsAux[id] = e.target.checked;
    this.setState({
      selectedSubtopics: selectedSubtopicsAux
    });
  }

  clickRemoveSubtopics() {
    const { subtopics, selectedSubtopics } = this.state;
    this.setState({
      subtopics: subtopics.filter(
        afterSubtopic =>
          Object.keys(selectedSubtopics)
            .filter(selectedSubtopic => selectedSubtopics[selectedSubtopic])
            .map(selectedSubtopicItem => parseInt(selectedSubtopicItem, 10))
            .indexOf(afterSubtopic.id) === -1
      ),
      selectedSubtopics: {}
    });
  }

  removeSubtopic(idSubtopic) {
    const { subtopics } = this.state;
    this.setState({
      subtopics: subtopics.filter(subtopic => subtopic.id !== idSubtopic)
    });
  }

  removeSubtopicObjective(idSubtopic, idObjective) {
    const { subtopics } = this.state;
    const subtopic = subtopics.find(subtopicFind => subtopicFind.id === idSubtopic);
    subtopic.objectives = subtopic.objectives.filter(
      objetiveFilter => objetiveFilter !== idObjective
    );
    this.setState({
      subtopics
    });
  }

  addSubtopicsObjectives(subtopicId, selectedObjectives) {
    const { subtopics } = this.state;
    const subtopic = subtopics.find(subtopicFind => subtopicFind.id === subtopicId);
    subtopic.objectives = subtopic.objectives.concat(
      Object.keys(selectedObjectives).map(objectiveId => parseInt(objectiveId, 10))
    );
    this.setState({
      subtopics
    });
  }

  clickAddSubtopic() {
    const { newSubtopic, subtopics } = this.state;
    let maxId = 0;
    subtopics.forEach(subtopic => {
      if (subtopic.id > maxId) {
        maxId = subtopic.id;
      }
    });
    subtopics.push({ name: newSubtopic.toString().trim(), id: maxId + 1, objectives: [] });
    this.setState({
      subtopics,
      newSubtopic: '',
      subtopicModal: false
    });
  }

  handleChangeSubtopic(e) {
    this.setState({
      newSubtopic: e.target.value
    });
  }

  render() {
    const { history, fields, title, addItemMessage, objectives, repositories } = this.props;
    const {
      fields: camposState,
      errors,
      modal,
      selectedSubtopics,
      subtopics,
      subtopicModal,
      newSubtopic
    } = this.state;
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
            {fields.map(campo => (
              <InputCustom
                error={errors[campo.value]}
                key={campo.value}
                validation={campo.validation}
                value={camposState[campo.value]}
                onChange={this.updateState}
                label={campo.label}
                name={campo.value}
                type={campo.type}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="add-subtitle float-left">Subtemas</div>
            <DeleteButton
              disabled={
                Object.keys(selectedSubtopics).filter(
                  selectedSubtopic => selectedSubtopics[selectedSubtopic]
                ).length === 0
              }
              style={{ marginLeft: '16px' }}
              className="float-right custom-shadow"
              text="Eliminar Subtema"
              onClick={this.clickRemoveSubtopics}
            />
            <NewButton
              className="float-right MyEnterprisesNewButton custom-shadow"
              text="Agregar Subtema"
              onClick={() => this.setState({ subtopicModal: true })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SubtopicsTable
              addSubtopicsObjectives={this.addSubtopicsObjectives}
              repositories={repositories}
              objectives={objectives}
              removeSubtopic={this.removeSubtopic}
              removeSubtopicObjective={this.removeSubtopicObjective}
              subtopics={subtopics}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewButton
              className="float-right MyEnterprisesNewButton custom-shadow"
              text="Guardar"
              onClick={this.validate}
            />
          </Col>
        </Row>
        <Modal
          autoFocus={false}
          centered
          show={subtopicModal}
          onHide={this.handleCloseSubtopicModal}
        >
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title className="custom-modal-title">
              <h4>Agregar subtema</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputCustom
              autoFocus
              name="topic-add-subtopic"
              inputWidth={12}
              classNameContainer="input-topic-add-subtopic"
              error={false}
              placeholder="Nombre del subtema"
              value={newSubtopic}
              onChange={this.handleChangeSubtopic}
              type="text"
            />
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <NewButton
              disabled={newSubtopic.toString().trim() === ''}
              className="MyEnterprisesNewButton custom-shadow"
              variant="primary"
              text="Agregar"
              onClick={this.clickAddSubtopic}
            />
          </Modal.Footer>
        </Modal>
        <Modal show={modal} onHide={this.handleClose}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title className="custom-modal-title">
              <OkSVG />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">{addItemMessage}</Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button
              className="custom-modal-accept-button"
              variant="primary"
              onClick={this.handleClose}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

AddEdit.defaultProps = {
  item: false,
  itemRequired: false,
  addItemFunctionCallback: false
};

AddEdit.propTypes = {
  history: validateHistory.isRequired,
  fields: validateFields.isRequired,
  title: PropTypes.string.isRequired,
  addItemFunction: PropTypes.func.isRequired,
  addItemMessage: PropTypes.string.isRequired,
  item: PropTypes.oneOfType([validateTopic, PropTypes.bool]),
  objectives: validateObjectives.isRequired,
  itemRequired: PropTypes.bool,
  addItemFunctionCallback: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  repositories: validateRepositories.isRequired
};

export default AddEdit;
