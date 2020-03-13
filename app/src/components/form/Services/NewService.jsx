import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SVG from 'react-inlinesvg';
import iconDelete from '../../../assets/icons/lo-icon-trash.svg';
import './styles.css';
import Select from '../Select';
import Checkbox from '../Checkbox';

class NewService extends Component {
  componentDidMount() {
    this.serviceInput.focus();
  }

  render() {
    const { id, callbackTextChange, idAS, callbackDelete } = this.props;
    const options = [
      {
        id: 'null',
        name: 'Cantidad',
        value: null
      },
      {
        id: '1',
        name: '1',
        value: '1'
      },
      {
        id: '2',
        name: '2',
        value: '2'
      }
    ];
    return (
      <Col md="6" sm="12" className="service-wrapper">
        <Row className="col-md-12">
          <Col md="6" sm="6" xs="6" className="service_first_container">
            <div className="service_cbox_container">
              <Checkbox id={id} defaultChecked />
            </div>
            <div className="service_text_container">
              <input
                ref={input => {
                  this.serviceInput = input;
                }}
                type="text"
                className="new_service_input"
                id={`new_service_input_${id}`}
                placeholder="Escribe aquí"
                onChange={e => callbackTextChange(e, idAS)}
              />
            </div>
          </Col>
          <Col md="5" sm="5" xs="5" className="service_secondary_container">
            <Select id={`select_${id}`} options={options} />
          </Col>
          <Col
            md="1"
            sm="1"
            xs="1"
            className="service_delete_button_container"
            onClick={e => callbackDelete(e, idAS)}
          >
            <SVG src={iconDelete} />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default NewService;
