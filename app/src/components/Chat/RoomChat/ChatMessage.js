
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';
import _ from 'lodash';
import moment from 'moment';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message } = this.props;

    return (
      <React.Fragment>
        {message.userId._id !== this.props.userId
          ? (
            <div className="incoming_msg">
              <div className="received_msg">
                <Row className="row-chat-message1">
                  <div className="incoming_msg_img">
                    <img className="thumbnail-img-round-chat-message" src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                  </div>
                  <div className="received_withd_msg">
                    <p>{message.message}</p>
                  </div>
                  <div className="hour-div-chat">{moment(message.createdAt).format('h:mm')}</div>
                </Row>
              </div>
            </div>
          ) : (
            <div className="outgoing_msg">
              <div className="sent_msg">
                <Row className="row-chat-message">
                  <div className="hour-div-chat">{moment(message.createdAt).format('h:mm')}</div>
                  <div className="out_msg">
                    <p>{message.message}</p>
                  </div>
                  <div className="incoming_msg_img">
                    {' '}
                    <img className="thumbnail-img-round-chat-message" src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                    {' '}
                  </div>
                </Row>
              </div>
            </div>
          )}
      </React.Fragment>
    );
  }
}


export default ChatMessage;
