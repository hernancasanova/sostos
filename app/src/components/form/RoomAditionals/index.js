import React, { Component } from 'react';
import AddEvents from './AddEvents';
import './style.css';
import { FormattedMessage } from 'react-intl';

import {

  Button, Col, Row, Label
} from 'reactstrap';

import {
  Input, DateComboPicker, Steps, BackButton, Select
} from '..';

class RoomAditionals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: 1
    };

    this.handleEventsChange = this.handleEventsChange.bind(this);
  }


  handleEventsChange(event) {
    this.setState({
      events: isNaN(event.target.value) ? 0 : parseInt(event.target.value, 10)
    });
  }

  render() {
    const lang = this.props.lang;
    const events = [];
    for (var i = 0; i < this.state.events; i++) {
      events.push(<AddEvents lang={lang} roomIndex={i + 1} />);
    }
    const options = [{
      id: 'null',
      name: 'Selecciona',
      value: null
    }, {
      id: '1',
      name: '1',
      value: '1'
    }, {
      id: '2',
      name: '2',
      value: '2'
    }];

    return (
      <React.Fragment>
        <div className="row roomsConfig">
          <Col md="6">
            <Label className="lo_bold_label room-distribution-label">
              <FormattedMessage
                id="new_room_2.number_of_rooms"
                defaultMessage="Number of rooms"
              />
            </Label>


            <Select
              onChange={this.handleEventsChange}
              defaultValue="Selecciona"
              lang={lang}
              options={options}
              // className="custom-select custom-select-lg mb-3 custom-select-many-rooms"
            />

          </Col>
        </div>
        {events}
      </React.Fragment>
    );
  }
}
export default RoomAditionals;
