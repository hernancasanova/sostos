import _ from 'lodash';
import React, { Component } from 'react';
import Event from './event';
import { AddButton } from '../../../form';

import './style.css';

import { FormattedMessage } from 'react-intl';


import {

  Button, Col, Row, Label
} from 'reactstrap';

import {
  Input, DateComboPicker, Steps, BackButton
} from '..';


class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEvents: this.props.initialValues.length>0?this.initvalues(this.props.initialValues,this.props.lang):[],
      eventId:this.props.initialValues.length>0?this.props.initialValues.length-1:0,
      newValueEvents:[]
    };

    this.addNewEvents = this.addNewEvents.bind(this);
    this.deleteNewEvent = this.deleteNewEvent.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
  }
  initvalues(initial,lang){
    const initialEvents = [];
    for (let i = 0; i < initial.length; i++) {
      initialEvents.push({
      key: `new_event__${i}`,
      id: `new_event__${i}`,
      callbackDelete: this.deleteNewEvent,
      value:initial[i],
      lang:{lang}
    });
    }
    return initialEvents;

  }
  /* Adds new event to list */
  addNewEvents(event) {
    const newEvents = this.state.newEvents;
    const lang = this.props.lang;
    newEvents.push({
      key: `new_event__${this.state.eventId}`,
      id: `new_event__${this.state.eventId}`,
      callbackDelete: this.deleteNewEvent,
      value:'',
      lang:{lang}
    });

    this.setState(
      prevState => ({
        newEvents,
        eventId: prevState.eventId + 1
      })
    );
  }

  /* Deletes clicked row from list */
  deleteNewEvent(id) {
    const newEvents = this.state.newEvents;
    for (let i = 0; i < newEvents.length; i++) {
      if (newEvents[i].id === id) {
        newEvents.splice(i, 1);
      }
    }
    this.setState({ newEvents });
    const selectValues = [];
    for (var i = 0; i < newEvents.length; i++) {
          if(newEvents[i].value != null)
          {selectValues.push(newEvents[i].value);}
    }
    if(selectValues.length > 0)
    {
        this.props.optionSelect(selectValues);
    }
  }


  /* Draw events */
  renderEvents(props) {
    const lang = this.props.lang;
    const output = _.map(props.events, (event, index) => (
      <Event
        key={`event__${event.id}`}
        id={`event__${event.id}`}
        lang={lang}
      />
    ));
    return output;
  }
  onChangeEvent(id,value){

    const newEvents = this.state.newEvents;
    for (let i = 0; i < newEvents.length; i++) {
      if (newEvents[i].id === id) {
          newEvents[i].value = value;
      }
    }
    this.setState({ newEvents });

    const selectValues = [];
    for (var i = 0; i < newEvents.length; i++) {
         if(newEvents[i].value != null)
          {selectValues.push(newEvents[i].value);}
    }
    if(selectValues.length > 0)
    {
        this.props.optionSelect(selectValues);
    }

  }

  /* Draws NewEvents */
  renderNewEvents(props) {
    const lang = this.props.lang;
    const output = _.map(this.state.newEvents, (event, index) => (
     <Event
        key={event.id}
        id={event.id}
        callbackDelete={this.deleteNewEvent}
        lang={lang}
        onChangeEvent={this.onChangeEvent}
        value={event.value}
      />
      /*<h1>{event +"index:"+index+"total:"+this.state.eventId}</h1>*/
    ));
    return output;
  }

  render() {
    return (
      <React.Fragment>
        <div className="events_main_container">
          {this.renderEvents(this.props)}
        </div>
        <div className="addNewEvents">

          {this.renderNewEvents(this.props)}
          <AddButton
            FormattedMessageId="new_room_4.add_new_event"
            onClick={e => this.addNewEvents()}
          />

        </div>
      </React.Fragment>
    );
  }
}

export default AddEvent;
