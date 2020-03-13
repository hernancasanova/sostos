
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';
import _ from 'lodash';
import ChatMessage from './ChatMessage';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const chats = _.map(this.props.messages, message => (
      <ChatMessage
        message={message}
        userId={this.props.userId}
        key={`chat-message-id-card-${message._id}`}
      />
    ));

    return (
      <div id="scrollEndMessage">
        {chats}
      </div>
    );
  }
}


export default ChatRoom;
