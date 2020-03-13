import React, { Component } from 'react';

import _ from 'lodash';
import { Row, Col, FormFeedback } from 'reactstrap';
import Checkbox from '../Checkbox';
import Select from '../Select';

import './styles.css';

const options = [
  {
    id: 'null',
    name: 'Selecciona',
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

class Service extends Component {
  render() {
    const { index, amount, name, checked, id } = this.props;
    const indx = _.findIndex(this.props.services, { id: index });
    const errorIndex = ['services', indx, 'amount'].join('_');
    return (
      <Col md="6" className="service-wrapper">
        <Row className="col-md-12">
          <Col md="6" className="service_first_container">
            <div className="service_cbox_container">
              <Checkbox
                id={id}
                checked={checked}
                onChange={e => this.props.onChangeServiceChecked(e, amount, name, index)}
              />
            </div>
            <div className="service_text_container">{name}</div>
          </Col>
          <Col md="6" className="service_secondary_container">
            <Select
              id={`select_${id}`}
              options={options}
              value={amount}
              onChange={e => this.props.onChangeServiceAmount(e, name, index)}
              selectedValue={amount}
            />
          </Col>
        </Row>
        {this.props.errors[errorIndex] !== undefined && (
          <Row className="row">
            <FormFeedback>{this.props.errors[errorIndex].feedback}</FormFeedback>
          </Row>
        )}
      </Col>
    );
  }
}

export default Service;
