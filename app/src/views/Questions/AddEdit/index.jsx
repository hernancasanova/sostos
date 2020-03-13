import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import GoBack from '../../../components/GoBack';
import { validateHistory, validateQuestion, validateTopics } from '../../../validators';
import InputCustom from '../../../components/form/InputCustom';
import Alternative from './alternative';
import GenericModal from '../../../components/Common/GenericModal';
import Select from '../../../components/form/Select';
import PreviewPDF from '../../../components/Common/PreviewPDF';
import ImageUploader from '../../../components/ImageUploader';
import PATHS from '../../../paths';
import FormulaComponent from '../../../components/Common/Formula';

/* global FileReader */
// 1.- Definir: const dropZone = React.createRef();
// 2.- A la instancia del ImageUploader agregar: ref={dropZone}
// 3.- Se pueden acceder con el siguiente código: dropZone.current.state.files
const dropZone = createRef();

const QUESTION_TYPE = {
  MATHTYPE: 'mathtype',
  PLAINTEXT: 'plaintext'
};

const ALIGNMENTS = {
  LEFT: 'left',
  MIDDLE: 'middle',
  RIGHT: 'right'
};

class AddEdit extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      modal: false,
      previewModal: false,
      alternatives: item
        ? item.alternatives.map(alternative => Object.assign({}, alternative))
        : [
            {
              id: 0,
              correct: true,
              text: '',
              image: false,
              alignment: ALIGNMENTS.LEFT
            }
          ],
      image: item && item.image ? item.image : false,
      // type: item && item.type ? QUESTION_TYPE.MATHTYPE : QUESTION_TYPE.PLAINTEXT,
      type: item && item.type ? item.type : QUESTION_TYPE.PLAINTEXT,
      difficulty: item ? item.difficulty : 0,
      topic: item ? item.topic : 0,
      subtopic: item ? item.subtopic : 0,
      alignment: item && item.alignment ? item.alignment : ALIGNMENTS.LEFT
    };
    this.addAlternative = this.addAlternative.bind(this);
    this.deleteAlternative = this.deleteAlternative.bind(this);
    this.editAlternativeText = this.editAlternativeText.bind(this);
    this.editAlternativeRadioButton = this.editAlternativeRadioButton.bind(this);
    this.dropZone = React.createRef();
    this.checkItem = this.checkItem.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDropAlternative = this.onDropAlternative.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.changeAligmentQuestionImage = this.changeAligmentQuestionImage.bind(this);
    this.editAlternativeImageAlignment = this.editAlternativeImageAlignment.bind(this);
    this.titleFormulaRef = React.createRef();
    this.changeTitleType = this.changeTitleType.bind(this);
  }

  componentDidMount() {
    this.checkItem();
  }

  componentDidUpdate() {
    this.checkItem();
  }

  onDrop(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ image: reader.result });
      };
    }
  }

  onDropAlternative(file, id) {
    const { alternatives } = this.state;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          alternatives: alternatives.map(alternative =>
            alternative.id === id
              ? Object.assign(alternative, { image: reader.result })
              : alternative
          )
        });
      };
    }
  }

  editAlternativeRadioButton(id) {
    const { alternatives } = this.state;
    const alternative =
      alternatives.filter(alter => alter.id === id).length > 0
        ? alternatives.filter(alter => alter.id === id)[0]
        : false;
    if (alternative) {
      alternatives.forEach(alter => {
        alter.correct = false;
      });
      alternative.correct = true;
      this.setState({
        alternatives
      });
    }
  }

  checkItem() {
    const { history, item, itemRequired } = this.props;
    if (!item && itemRequired) {
      history.replace(PATHS.QUESTIONS);
    }
  }

  editAlternativeText(id, text) {
    const { alternatives } = this.state;
    const alternative =
      alternatives.filter(alter => alter.id === id).length > 0
        ? alternatives.filter(alter => alter.id === id)[0]
        : false;
    if (alternative) {
      alternative.text = text;
      this.setState({
        alternatives
      });
    }
  }

  editAlternativeImageAlignment(id, alignment) {
    const { alternatives } = this.state;
    const alternative =
      alternatives.filter(alter => alter.id === id).length > 0
        ? alternatives.filter(alter => alter.id === id)[0]
        : false;
    if (alternative) {
      alternative.alignment = alignment;
      this.setState({
        alternatives
      });
    }
  }

  deleteAlternative(id) {
    const { alternatives } = this.state;
    let hasCorrect = false;
    const alternativesAux = alternatives.filter(alternative => alternative.id !== id);
    if (alternativesAux.length > 0) {
      alternativesAux.forEach(alternative => {
        if (alternative.correct) {
          hasCorrect = true;
        }
      });
      if (!hasCorrect) {
        alternativesAux[0].correct = true;
      }
    }
    this.setState({
      alternatives: alternativesAux
    });
  }

  removePhoto(id) {
    const { alternatives } = this.state;
    this.setState({
      alternatives: alternatives.map(alternative =>
        alternative.id === id ? Object.assign(alternative, { image: false }) : alternative
      )
    });
  }

  addAlternative() {
    const { alternatives } = this.state;
    const alternative = {
      id: alternatives.length,
      correct: false,
      text: ''
    };
    alternatives.push(alternative);
    this.setState({
      alternatives
    });
  }

  changeAligmentQuestionImage(alignment) {
    this.setState({ alignment });
  }

  changeTitleType() {
    const { type } = this.state;
    switch (type) {
      case QUESTION_TYPE.MATHTYPE:
        this.setState({ type: QUESTION_TYPE.PLAINTEXT });
        break;
      case QUESTION_TYPE.PLAINTEXT:
        this.setState({ type: QUESTION_TYPE.MATHTYPE });
        break;
      default:
        break;
    }
  }

  render() {
    const { history, questionsAdd, item, topics } = this.props;
    const {
      alignment,
      alternatives,
      difficulty,
      image,
      modal,
      previewModal,
      subtopic,
      topic,
      type
    } = this.state;
    const temaActual = topics.find(topicFind => topicFind.id === topic) || false;
    const subTemas = temaActual ? temaActual.subtopics : [];
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{item ? 'Editar Pregunta' : 'Agregar Pregunta'}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Formik
              initialValues={{
                code: item ? item.code : '',
                title: item ? item.title : '',
                description: item ? item.description : ''
              }}
              validate={values => {
                const errors = {};
                if (!values.code || values.code.trim() === '') {
                  errors.code = `El campo código es requerido`;
                }
                alternatives.forEach(alter => {
                  if (alter.text.trim() === '') {
                    errors[alter.id] = 'El texto de la alternativa es requerido';
                  }
                });
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const valuesAux = Object.assign({}, values);
                valuesAux.alternatives = alternatives;
                valuesAux.difficulty = difficulty;
                valuesAux.alignment = alignment;
                valuesAux.type = type;
                valuesAux.topic = topic;
                valuesAux.subtopic = subtopic;
                valuesAux.image = image;
                if (item) {
                  valuesAux.id = item.id;
                }
                if (valuesAux.type === QUESTION_TYPE.MATHTYPE) {
                  valuesAux.title = this.titleFormulaRef.current.getMathML();
                }
                questionsAdd(valuesAux);
                this.setState({ modal: true });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg="6">
                      <InputCustom
                        labelWidth={4}
                        inputWidth={8}
                        label="Código"
                        name="code"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        error={errors.code && touched.code && errors.code}
                      />
                    </Col>
                    <Col lg="2" className="FormLabel">
                      Dificultad
                    </Col>
                    <Col lg="4">
                      <Select
                        slim
                        value={difficulty}
                        onChange={e => this.setState({ difficulty: e })}
                        options={[
                          {
                            value: -1,
                            label: 'Fácil'
                          },
                          {
                            value: 0,
                            label: 'Normal'
                          },
                          {
                            value: 1,
                            label: 'Dificil'
                          }
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '10px' }}>
                    <Col lg="2" className="FormLabel">
                      Tema
                    </Col>
                    <Col lg="4">
                      <Select
                        slim
                        value={topic}
                        onChange={e => this.setState({ topic: e })}
                        options={[{ label: 'Seleccione tema', value: 0 }].concat(
                          topics.map(topicMap => {
                            const { name: label, id: value } = topicMap;
                            return {
                              label,
                              value
                            };
                          })
                        )}
                      />
                    </Col>

                    <Col lg="2" className="FormLabel">
                      Subtema
                    </Col>
                    <Col lg="4">
                      <Select
                        slim
                        value={subtopic}
                        onChange={e => this.setState({ subtopic: e })}
                        options={[{ label: 'Seleccione subtema', value: 0 }].concat(
                          subTemas.map(subtema => {
                            const { name: label, id: value } = subtema;
                            return {
                              label,
                              value
                            };
                          })
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="2" className="FormLabel">
                      <Form>
                        <Form.Check
                          className="noselect"
                          onChange={this.changeTitleType}
                          checked={type === QUESTION_TYPE.MATHTYPE}
                          type="switch"
                          id="question-type"
                          label="Título fórmula"
                        />
                      </Form>
                    </Col>
                    <Col sm="10">
                      {type === QUESTION_TYPE.MATHTYPE && (
                        <FormulaComponent ref={this.titleFormulaRef} formula={item.title} />
                      )}
                      {type === QUESTION_TYPE.PLAINTEXT && (
                        <InputCustom
                          inputWidth={12}
                          name="title"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          error={errors.title && touched.title && errors.title}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputCustom
                        labelWidth={2}
                        inputWidth={10}
                        label="Descripción"
                        name="description"
                        type="textarea"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '14px' }}>
                    <Col className="FormLabel" lg="2">
                      Imagen
                    </Col>
                    <Col lg="7">
                      <ImageUploader
                        onDrop={this.onDrop}
                        removePhoto={() => this.setState({ image: false })}
                        image={image}
                        ref={dropZone}
                      />
                    </Col>
                    <Col lg="3">
                      <Row>
                        <Form.Check
                          checked={alignment === ALIGNMENTS.LEFT}
                          onChange={() =>
                            this.setState({
                              alignment: ALIGNMENTS.LEFT
                            })
                          }
                          type="radio"
                          id="question-image-alignment-left"
                          label="Izq."
                        />
                      </Row>
                      <Row>
                        <Form.Check
                          checked={alignment === ALIGNMENTS.MIDDLE}
                          onClick={() =>
                            this.setState({
                              alignment: ALIGNMENTS.MIDDLE
                            })
                          }
                          type="radio"
                          id="question-image-alignment-middle"
                          label="Centro"
                        />
                      </Row>
                      <Row>
                        <Form.Check
                          checked={alignment === ALIGNMENTS.RIGHT}
                          onClick={() =>
                            this.setState({
                              alignment: ALIGNMENTS.RIGHT
                            })
                          }
                          type="radio"
                          id="question-image-alignment-right"
                          label="Der."
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Row className="alternatives-container-row">
                    <Col className="questions-alternatives" lg="12">
                      <Row>
                        <Col style={{ fontWeight: 'bold', fontSize: '20px', color: '#414141' }}>
                          Alternativas
                        </Col>
                      </Row>
                      <Row>
                        <div className="alternatives-container col">
                          {alternatives.map(alternative => (
                            <Alternative
                              onDrop={this.onDropAlternative}
                              removePhoto={this.removePhoto}
                              error={errors[alternative.id]}
                              editAlternativeImageAlignment={this.editAlternativeImageAlignment}
                              editAlternativeRadioButton={this.editAlternativeRadioButton}
                              editAlternativeText={this.editAlternativeText}
                              deleteAlternative={this.deleteAlternative}
                              key={alternative.id}
                              id={alternative.id}
                              alternative={alternative}
                            />
                          ))}
                          <Row>
                            <Col className="alternative-add-button-col">
                              <button
                                disabled={alternatives.length > 4}
                                onClick={this.addAlternative}
                                className="float-right NewButton custom-shadow"
                                type="button"
                              >
                                Agregar Alternativa
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button
                        style={{ marginTop: '16px' }}
                        className="float-right NewButton custom-shadow"
                        type="submit"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() =>
                          this.setState({
                            previewModal: true
                          })
                        }
                        style={{ marginTop: '16px', marginRight: '16px' }}
                        className="float-right NewButton custom-shadow"
                        type="button"
                      >
                        Vista Previa
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            </Formik>
          </Col>
        </Row>
        <GenericModal
          modal={modal}
          message={item ? 'Pregunta editada exitosamente' : 'Pregunta agregada exitosamente'}
          handleClose={
            item ? () => this.setState({ modal: false }) : () => history.push(PATHS.QUESTIONS)
          }
        />
        {item && (
          <PreviewPDF
            questions={[item]}
            modal={previewModal}
            handleClose={() => this.setState({ previewModal: false })}
          />
        )}
      </Container>
    );
  }
}

AddEdit.defaultProps = {
  item: false,
  itemRequired: false
};

AddEdit.propTypes = {
  history: validateHistory.isRequired,
  questionsAdd: PropTypes.func.isRequired,
  item: PropTypes.oneOfType([validateQuestion, PropTypes.bool]),
  topics: validateTopics.isRequired,
  itemRequired: PropTypes.bool
};

export default AddEdit;
