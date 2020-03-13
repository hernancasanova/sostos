import React, { Component } from 'react';
import { Col } from 'reactstrap';

import SVG from 'react-inlinesvg';
// import Checkbox from '../Checkbox/Checkbox';

import iconDelete from '../../../../assets/icons/lo-icon-trash.svg';
import Select from '../../Select';
import Checkbox from '../../Checkbox';

class NewBoatService extends Component {
  constructor(props) {
    super(props);
    this.deleteService = this.deleteService.bind(this);
  }

  componentDidMount() {
    this.serviceInput.focus();
  }

  deleteService(event) {
    if (this.props.callbackDelete) {
      this.props.callbackDelete(this.props.id);
    }
  }

  renderNewService(props) {
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
        <Col md="6" sm="6" xs="6" className="service_first_container">
          <div className="service_cbox_container">
            <Checkbox id={props.id} defaultChecked />
          </div>
          <div className="service_text_container">
            <input
              ref={input => {
                this.serviceInput = input;
              }}
              type="text"
              className="new_service_input"
              id={`new_service_input_${props.id}`}
              placeholder="Escribe aquí"
            />
          </div>
        </Col>

        <Col md="5" sm="5" xs="5" className="service_secondary_container">
          <Select id={`select_${this.props.id}`} options={options} />
        </Col>

        <Col
          md="1"
          sm="1"
          xs="1"
          className="service_delete_button_container"
          onClick={e => this.deleteService(e)}
        >
          <SVG src={iconDelete} />
        </Col>
      </Col>
    );
  }

  render(props) {
    return <React.Fragment>{this.renderNewService(this.props)}</React.Fragment>;
  }
}

export default NewBoatService;
