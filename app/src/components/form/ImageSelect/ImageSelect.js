import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import './style.css';
import {
  Select, Input, Steps, BackButton
} from '..';
import _ from 'lodash';

class ImageSelect extends Component {
  constructor(props) {
    super(props);
    this.changeRoomBoat = this.changeRoomBoat.bind(this);
    this.state = {
      photo:'https://placehold.it/500x500'
    };
  }

  handleClick(event) {
    if (this.props.onClick !== undefined) {
      this.props.onClick(event);
    }
  }

  componentWillMount() {
    const options = _.find(this.props.options, { id:this.props.initValue });
    this.setState({
      photo: options.src
    });
    this.props.changeBoatRoom(this.props.initValue, options.type, options.prices);
  }

  changeRoomBoat(e) {
    const options = _.find(this.props.options, { id:e.target.value });
    this.setState({
      photo: options.src
    });
    this.props.changeBoatRoom(e.target.value, options.type, options.prices);
  }

  render(props) {
    const options = this.props.options;
    return (
      <React.Fragment>
        <Row>
          <Col md="3"><img src={this.state.photo} alt="house_picture" className="lo_image_select_picture" /></Col>
          <Col md="6" className="lo_image_select">
            <Select id="lo_image_select" options={options} value={this.props.initValue} onChange={this.changeRoomBoat} />
          </Col>

        </Row>

      </React.Fragment>
    );
  }
}


export default ImageSelect;
