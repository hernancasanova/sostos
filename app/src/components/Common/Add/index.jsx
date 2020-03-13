import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import NewButton from '../../Buttons/NewButton';
import GoBack from '../../GoBack';
import { validateHistory, validateFields } from '../../../validators';
import InputCustom from '../../form/InputCustom';
import OkSVG from '../SVG/ok';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      modal: false
    };
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      modal: false
    });
  }

  validate() {
    const { fields, addItemFunction, selectedInstitution } = this.props;
    const { fields: stateFields } = this.state;
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
      addItemFunction(stateFields, selectedInstitution);
      this.setState({
        modal: true,
        fields: {},
        errors: {}
      });
    } else {
      this.setState({
        errors
      });
    }
  }

  updateState(e) {
    const { fields } = this.state;
    const { selectedInstitution } = this.props;
    fields[e.target.name] = e.target.value;
    if (selectedInstitution) {
      fields.institution = selectedInstitution;
    }
    this.setState({
      fields
    });
  }

  render() {
    const { history, fields, title, addItemMessage } = this.props;
    const { fields: stateFields, errors, modal } = this.state;

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
                value={stateFields[campo.value]}
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
            <NewButton
              className="float-right MyEnterprisesNewButton custom-shadow"
              text="Guardar"
              onClick={this.validate}
            />
          </Col>
        </Row>
        <Modal show={modal} onHide={this.handleClose}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title className="custom-modal-title">
              <OkSVG />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">{addItemMessage}</Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button
              className="custom-modal-accept-button custom-shadow"
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

Add.defaultProps = {
  selectedInstitution: false
};

Add.propTypes = {
  history: validateHistory.isRequired,
  fields: validateFields.isRequired,
  title: PropTypes.string.isRequired,
  addItemFunction: PropTypes.func.isRequired,
  addItemMessage: PropTypes.string.isRequired,
  selectedInstitution: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default Add;
