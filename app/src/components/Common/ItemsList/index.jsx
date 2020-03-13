import React, { Component } from 'react';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import NewButton from '../../Buttons/NewButton';
import DeleteButton from '../../Buttons/DeleteButton';
import ItemsTable from './itemsTable';
import GoBack from '../../GoBack';
import {
  validateHistory,
  validateGroups,
  validateColumns,
  validateAttendees
} from '../../../validators';
import OkSVG from '../SVG/ok';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      modal: false,
      searching: ''
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
      extraButton
    } = this.props;
    const { modal, selected, searching } = this.state;
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
        <Row className="itemlist-controls-container">
          <Col xl={extraButton ? 4 : 6}>
            <input
              onChange={this.handleChange}
              value={searching}
              type="text"
              className="form-control"
              placeholder="Buscar..."
            />
          </Col>
          <Col xl={extraButton ? 8 : 6} className="pr-0">
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
            {extraButton}
          </Col>
        </Row>
        <Row>
          <Col className="pr-0">
            <ItemsTable
              mainColumn={mainColumn}
              noFilter={noFilter}
              onClick={this.clickCheckbox}
              url={singleItemUrl}
              columns={columns}
              selected={selected}
              selectedInstitution={selectedInstitution}
              items={items.filter(item => {
                let visible = false;
                columns.forEach(column => {
                  if (!visible && typeof item[column.value] !== 'undefined') {
                    visible =
                      visible ||
                      item[column.value]
                        .toString()
                        .trim()
                        .toLowerCase()
                        .includes(searching.trim().toLocaleLowerCase());
                  }
                });
                return visible;
              })}
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
  mainColumn: 'name',
  isQuestions: false,
  extraButton: false
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
  isQuestions: PropTypes.bool,
  extraButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
};

export default ItemsList;
