import React, { createRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Input from '../../../components/form/Input/Input';
import { validateAlternative } from '../../../validators';
import ImageUploader from '../../../components/ImageUploader';

const dropZone = createRef();

const ALIGNMENTS = {
  LEFT: 'left',
  MIDDLE: 'middle',
  RIGHT: 'right'
};

const Alternative = props => {
  const {
    alternative,
    deleteAlternative,
    editAlternativeText,
    editAlternativeRadioButton,
    editAlternativeImageAlignment,
    error,
    onDrop,
    removePhoto,
    id: idAlternative
  } = props;
  const { correct, text, id, alignment } = alternative;
  const alignmentFix = alignment || 'left';
  return (
    <Row className="alternative-row">
      <Col className="alternative-radio-col" lg="1">
        <input
          onChange={() => editAlternativeRadioButton(id)}
          checked={correct}
          className="alternative-radio-input"
          type="radio"
        />
      </Col>
      <Col lg="4">
        <Input
          error={error}
          onChange={e => editAlternativeText(id, e.target.value)}
          type="text"
          value={text}
        />
      </Col>
      <Col
        className="alternative-text-button"
        style={{ textAlign: 'center', cursor: 'pointer', fontSize: '12px' }}
        lg="4"
      >
        <ImageUploader
          slim
          id={idAlternative}
          onDrop={onDrop}
          removePhoto={() => removePhoto(idAlternative)}
          image={alternative.image}
          ref={dropZone}
        />
      </Col>
      <Col lg="1">
        <Row>
          <Form.Check
            onChange={() => editAlternativeImageAlignment(idAlternative, ALIGNMENTS.LEFT)}
            checked={alignmentFix === ALIGNMENTS.LEFT}
            type="radio"
            id={`alternative-image-alignment-left-${idAlternative}`}
            label="Izq."
          />
        </Row>
        <Row>
          <Form.Check
            onChange={() => editAlternativeImageAlignment(idAlternative, ALIGNMENTS.MIDDLE)}
            checked={alignmentFix === ALIGNMENTS.MIDDLE}
            type="radio"
            id={`alternative-image-alignment-middle-${idAlternative}`}
            label="Centro"
          />
        </Row>
        <Row>
          <Form.Check
            onChange={() => editAlternativeImageAlignment(idAlternative, ALIGNMENTS.RIGHT)}
            checked={alignmentFix === ALIGNMENTS.RIGHT}
            type="radio"
            id={`alternative-image-alignment-right-${idAlternative}`}
            label="Der."
          />
        </Row>
      </Col>
      <Col
        className="alternative-text-button"
        style={{ textAlign: 'center', cursor: 'pointer', fontSize: '12px' }}
        lg="2"
      >
        <span onClick={() => deleteAlternative(id)}>
          <u>Eliminar</u>
        </span>
      </Col>
    </Row>
  );
};

Alternative.defaultProps = {
  error: false
};

Alternative.propTypes = {
  deleteAlternative: PropTypes.func.isRequired,
  alternative: validateAlternative.isRequired,
  editAlternativeText: PropTypes.func.isRequired,
  editAlternativeRadioButton: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onDrop: PropTypes.func.isRequired,
  removePhoto: PropTypes.func.isRequired,
  editAlternativeImageAlignment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default Alternative;
