import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import NewButton from '../../Buttons/NewButton';
import GoBack from '../../GoBack';
import { validateHistory, validateFields, validateAttendee } from '../../../validators';
import InputCustom from '../../form/InputCustom';
import OkSVG from '../SVG/ok';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      fields: Object.assign({}, item),
      errors: {},
      modal: false
    };
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }

  componentDidMount() {
    this.checkItem();
  }

  componentDidUpdate() {
    this.checkItem();
  }

  checkItem() {
    const { itemRequired, itemRequiredUrl, history, item } = this.props;
    if (itemRequired && !item) {
      history.replace(itemRequiredUrl);
    }
  }

  handleClose() {
    const { addItemFunctionCallback } = this.props;
    this.setState({
      modal: false
    });
    if (addItemFunctionCallback) addItemFunctionCallback();
  }

  validate() {
    const { fields, addItemFunction, selectedInstitution, item, groupId, showModal } = this.props;
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
      if (groupId) {
        addItemFunction(stateFields, selectedInstitution, groupId);
      } else {
        addItemFunction(stateFields, selectedInstitution);
      }
      if (item) {
        this.setState({
          modal: true,
          errors: {}
        });
      } else if (showModal) {
        this.setState({
          modal: true,
          fields: {},
          errors: {}
        });
      } else {
        this.handleClose();
      }
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
    const { history, fields, title, addItemMessage, submitButtonText, noHeader } = this.props;
    const { fields: stateFields, errors, modal } = this.state;
    return (
      <Container>
        {!noHeader && (
          <Row>
            <Col>
              <GoBack history={history} />
            </Col>
          </Row>
        )}
        {!noHeader && (
          <Row>
            <Col>
              <h3>{title}</h3>
            </Col>
          </Row>
        )}
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
              text={submitButtonText}
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

AddEdit.defaultProps = {
  selectedInstitution: false,
  item: false,
  submitButtonText: 'Guardar',
  itemRequired: false,
  itemRequiredUrl: '',
  addItemFunctionCallback: false,
  noHeader: false,
  groupId: false,
  showModal: true
};

AddEdit.propTypes = {
  history: validateHistory.isRequired,
  fields: validateFields.isRequired,
  title: PropTypes.string.isRequired,
  addItemFunction: PropTypes.func.isRequired,
  addItemMessage: PropTypes.string.isRequired,
  selectedInstitution: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  item: PropTypes.oneOfType([validateAttendee, PropTypes.bool]),
  submitButtonText: PropTypes.string,
  itemRequired: PropTypes.bool,
  itemRequiredUrl: PropTypes.string,
  addItemFunctionCallback: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  noHeader: PropTypes.bool,
  groupId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  showModal: PropTypes.bool
};

export default AddEdit;
