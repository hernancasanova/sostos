import React, { Component } from 'react';
import {
  Button, Col, Row, Label, FormFeedback
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {
  Input, DateComboPicker, Steps, BackButton, Select
} from '../..';
import selects from
  '../../../../translations/selects.js';

class Bed extends Component {
  constructor(props) {
    super(props);
    this.changeBedType = this.changeBedType.bind(this);
    this.changeBedQuantity = this.changeBedQuantity.bind(this);

    this.state = {
      bedType: '',
      bedQuantity: ''
    };
  }

  changeBedType(e) {
    this.setState({
      bedType: e.target.value
    }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }

  changeBedQuantity(e) {
    this.setState({
      bedQuantity: parseInt(e.target.value)
    }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }

  render() {
    const errorType     = (['bedRooms', this.props.roomIndex, 'beds', this.props.bedIndex, 'bedType']).join('_');
    const errorQuantity = (['bedRooms', this.props.roomIndex, 'beds', this.props.bedIndex, 'bedQuantity']).join('_');
    return (
      <div>
        <Row className="bedsSelectors">
          <Col md="8">
            <Select
              id={`bed_selector_${this.props.id}`}
              options={selects[this.props.lang].bedTypes}
              onChange={e => this.changeBedType(e)}
              value={this.props.data.bedType}
            />
          </Col>

          <Col md="4">
            <Select
              id={`bed_selector_2_${this.props.id}`}
              options={selects[this.props.lang].oneToFive}
              onChange={e => this.changeBedQuantity(e)}
              value={this.props.data.bedQuantity}
            />
          </Col>
        </Row>
        { (this.props.errors[errorType] !== undefined || this.props.errors[errorQuantity] !== undefined) &&
          (
            <Row>
              <Col md="8">
                { this.props.errors[errorType] !== undefined  && 
                  (
                  <FormFeedback>
                    <FormattedMessage
                      id={`validators.${this.props.errors[errorType].field}.${this.props.errors[errorType].type}`}
                      defaultMessage={this.props.errors[errorType].feedback}
                    />
                  </FormFeedback>) }
              </Col>
              <Col md="4">
                { this.props.errors[errorQuantity] !== undefined  && 
                  (
                  <FormFeedback>
                    <FormattedMessage
                      id={`validators.${this.props.errors[errorQuantity].field}.${this.props.errors[errorQuantity].type}`}
                      defaultMessage={this.props.errors[errorQuantity].feedback}
                    />
                  </FormFeedback>) }
              </Col>
            </Row>
          )}
        </div>
    );
  }
}
export default Bed;
