import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import NewButton from '../../../components/Buttons/NewButton';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import GoBack from '../../../components/GoBack';
import {
  validateHistory,
  validateFields,
  validateAttendee,
  validateRepositories
} from '../../../validators';
import InputCustom from '../../../components/form/InputCustom';
import OkSVG from '../../../components/Common/SVG/ok';
import PATHS from '../../../paths';
import ItemsTable from '../../../components/Common/ItemsList/itemsTable';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    const selected = {};
    if (item && item.repositories) {
      const itemRepositories = item.repositories;
      itemRepositories.forEach(itemRepository => {
        selected[itemRepository] = true;
      });
    }
    this.state = {
      fields: Object.assign({}, item),
      errors: {},
      modal: false,
      selected
    };
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.clickCheckbox = this.clickCheckbox.bind(this);
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
      history.replace(PATHS.OBJECTIVES);
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
    const { fields, addItemFunction, selectedInstitution, item } = this.props;
    const { fields: stateFields, selected } = this.state;
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
      stateFields.repositories =
        typeof selected === 'undefined'
          ? []
          : Object.keys(selected)
              .filter(selectedId => selected[selectedId])
              .map(selectedId => parseInt(selectedId, 10));
      addItemFunction(stateFields, selectedInstitution);
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
    const { selectedInstitution } = this.props;
    fields[e.target.name] = e.target.value;
    if (selectedInstitution) {
      fields.institution = selectedInstitution;
    }
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

  render() {
    const {
      history,
      fields,
      title,
      addItemMessage,
      submitButtonText,
      selectedInstitution,
      repositories
    } = this.props;
    const { fields: stateFields, errors, modal, selected } = this.state;
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
              text={submitButtonText}
              onClick={this.validate}
            />
          </Col>
        </Row>
        <div className="addedit-objectives-repositories-container">
          <Row style={{ marginTop: '16px', marginBottom: '8px', marginRight: '8px' }}>
            <Col>
              <div className="add-subtitle float-left">Recursos</div>
              <DeleteButton
                style={{ marginLeft: '16px' }}
                className="float-right custom-shadow"
                text="Eliminar Recurso"
                onClick={() => alert('Eliminar Recursos')}
              />
              <NewButton
                className="float-right MyEnterprisesNewButton custom-shadow"
                text="Agregar Recurso"
                url={PATHS.REPOSITORIES_ADD}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemsTable
                selectedInstitution={selectedInstitution}
                selected={selected}
                noFilter
                onClick={this.clickCheckbox}
                url={PATHS.REPOSITORIES_PRE_SINGLE}
                columns={[
                  {
                    label: 'Archivo',
                    value: 'name'
                  },
                  {
                    label: 'Descripción',
                    value: 'description'
                  }
                ]}
                items={repositories}
              />
            </Col>
          </Row>
        </div>
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
  addItemFunctionCallback: false
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
  repositories: validateRepositories.isRequired,
  itemRequired: PropTypes.bool,
  addItemFunctionCallback: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default AddEdit;
