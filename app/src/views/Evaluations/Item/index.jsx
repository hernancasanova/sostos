import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import NewButton from '../../../components/Buttons/NewButton';
import GoBack from '../../../components/GoBack';
// import ItemsTable from '../../../components/Common/ItemsList/itemsTable';
import ItemsTableQuestions from '../../../components/Common/ItemsList/itemsTableQuestions';
import PATHS from '../../../paths';
import {
  validateHistory,
  validateEvaluation,
  validateQuestion,
  validateTopics
} from '../../../validators';
import QuestionsModal from './questionsModal';
import GenericModal from '../../../components/Common/GenericModal';
import PreviewPDF from '../../../components/Common/PreviewPDF';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      selectedModal: {},
      modal: false,
      modalBinded: false,
      modalUnbinded: false,
      previewModal: false
    };
    this.clickCheckbox = this.clickCheckbox.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.clickCheckboxModal = this.clickCheckboxModal.bind(this);
    this.bindAttendees = this.bindAttendees.bind(this);
    this.unbindAttendees = this.unbindAttendees.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }

  componentDidMount() {
    this.checkItem();
  }

  componentDidUpdate() {
    this.checkItem();
  }

  checkItem() {
    const { history, evaluation } = this.props;
    if (!evaluation) {
      history.replace(PATHS.EVALUATIONS);
    }
  }

  openModal() {
    this.setState({ modal: true });
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
    Object.keys(selectedAux).forEach(singleSelect => {
      if (selectedAux[singleSelect] === false) {
        delete selectedAux[singleSelect];
      }
    });
    this.setState({
      selected: selectedAux
    });
  }

  clickCheckboxModal(id, e) {
    const { selectedModal } = this.state;
    const selectedModalAux = Object.assign({}, selectedModal);
    selectedModalAux[id] = e.target.checked;
    Object.keys(selectedModalAux).forEach(singleSelect => {
      if (selectedModalAux[singleSelect] === false) {
        delete selectedModalAux[singleSelect];
      }
    });
    this.setState({
      selectedModal: selectedModalAux
    });
  }

  bindAttendees() {
    const { selectedModal } = this.state;
    const { evaluationsBindQuestions, evaluation } = this.props;
    const selectedElements = Object.keys(selectedModal).length > 0;
    if (selectedElements) {
      evaluationsBindQuestions(
        evaluation,
        Object.keys(selectedModal).map(singleSelect => parseInt(singleSelect, 10))
      );
    }
    this.setState({ selectedModal: {}, modal: false, modalBinded: selectedElements });
  }

  unbindAttendees() {
    const { selected } = this.state;
    const { evaluationsUnbindQuestions, evaluation } = this.props;
    evaluationsUnbindQuestions(
      evaluation,
      Object.keys(selected).map(singleSelect => parseInt(singleSelect, 10))
    );
    this.setState({ selected: {}, modalUnbinded: true });
  }

  render() {
    const { history, evaluation, questions, topics } = this.props;
    const { name } = evaluation;
    const { selected, modal, modalBinded, modalUnbinded, previewModal } = this.state;
    if (!evaluation) {
      return (
        <Container>
          <Row>
            <Col>
              <GoBack history={history} />
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{evaluation.name}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="float-left groups-attendees-title">Preguntas</div>
            <DeleteButton
              disabled={!Object.keys(selected).length > 0}
              style={{ marginLeft: '16px' }}
              className="MyEnterprisesNewButton button-delete-institution float-right custom-shadow"
              text="Eliminar Pregunta"
              onClick={this.unbindAttendees}
            />
            <NewButton
              className="MyEnterprisesNewButton  boton-agregar-institucion float-right custom-shadow"
              text="Agregar Pregunta"
              onClick={this.openModal}
            />
            <NewButton
              className="MyEnterprisesNewButton evaluation-item-button-preview float-right custom-shadow"
              text="Vista Previa"
              onClick={() => this.setState({ previewModal: true })}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ItemsTableQuestions
              mainColumn="code"
              noFilter
              onClick={this.clickCheckbox}
              columns={[
                {
                  label: 'Código',
                  value: 'code'
                },
                {
                  label: 'Pregunta',
                  value: 'title'
                }
              ]}
              url={PATHS.QUESTIONS_PRE_SINGLE}
              items={questions.filter(question => evaluation.questions.indexOf(question.id) !== -1)}
            />
          </Col>
        </Row>

        <QuestionsModal
          topics={topics}
          modal={modal}
          closeModal={this.closeModal}
          clickCheckboxModal={this.clickCheckboxModal}
          questions={questions}
          evaluation={evaluation}
          bindAttendees={this.bindAttendees}
        />
        <GenericModal
          modal={modalBinded}
          handleClose={() => this.setState({ modalBinded: false })}
          message="Pregunta agregada exitosamente"
        />
        <GenericModal
          modal={modalUnbinded}
          handleClose={() => this.setState({ modalUnbinded: false })}
          message="Preguntas eliminadas exitosamente"
        />
        <PreviewPDF
          title={name}
          questions={evaluation.questions.map(idQuestion =>
            questions.find(question => question.id === idQuestion)
          )}
          modal={previewModal}
          handleClose={() => this.setState({ previewModal: false })}
        />
      </Container>
    );
  }
}

Item.propTypes = {
  history: validateHistory.isRequired,
  evaluation: validateEvaluation.isRequired,
  questions: validateQuestion.isRequired,
  evaluationsBindQuestions: PropTypes.func.isRequired,
  evaluationsUnbindQuestions: PropTypes.func.isRequired,
  topics: validateTopics.isRequired
};

export default Item;
