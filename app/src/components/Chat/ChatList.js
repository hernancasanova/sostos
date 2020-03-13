
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';
import _ from 'lodash';
import ItemChat from './ItemChat';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idMessageActive :null
    };
    this.messageActive = this.messageActive.bind(this);
  }

  messageActive(id) {
    this.setState({ idMessageActive:id });
    this.props.messageCallback(id);
  }

  isActive(active) {
    return (this.state.idMessageActive == active);
  }

  render() {
    const items = this.props.items;

    const chats = _.map(items, (item, index) => (
      <ItemChat
        lang={this.props.lang}
        key={`message-id-card-${item._id}`}
        id={`message-id-card-${item._id}`}
        item={item}
        activeCallback={this.messageActive}
        active={this.isActive(item._id)}
        user={this.props.user}
      />
    ));
    return (
      <React.Fragment>
        <Col className="body-chat-list">
          {chats}
        </Col>
      </React.Fragment>
    );
  }
}


export default ChatList;
