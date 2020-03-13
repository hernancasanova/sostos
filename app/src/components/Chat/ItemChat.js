import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';
import iconStar from '../../assets/icons/lo-icon-star.svg';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';


class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.pressedMessage = this.pressedMessage.bind(this);
  }

  pressedMessage() {

    this.props.activeCallback(this.props.item._id);
  }

  render(props) {

    const {lang,item,user} = this.props;
    var userFilter =_.filter(item.users,function(user) {

       return user._id !== user._id;
    });
  

    return (
      <React.Fragment>
        <Row className={`body-chat-card ${this.props.active ? 'active-message' : 'disable-message'}`} onClick={this.pressedMessage}>
         <Row>
          <Col sm="3"> <img
              className="thumbnail-img-round-message"
              src={'https://lorempixel.com/200/200'}
            />
          </Col>
          <Col sm="9">
            <Row>
              <Col sm="7" className="letterfix_container">
                <p className = "letter-fix-item-chat">
                {userFilter.length > 0 ? 
                  (item.users[0].firstName||item.users[0].email) :
                  (user.firstName || user.email) }
                </p>
              </Col>
              <Col sm="5" className="chat_date_container">
              {item.messages.length > 0 ? 
                moment(item.messages[0].createdAt).format('DD/MM/YY') :
                ""}
              </Col>
            </Row>
            <Row className="splitmessage_container">
              {item.messages.length > 0 ?
                (`${item.messages[0].message.slice(0, 16)} ...` : '') :
                "iniciar chat .."}
            </Row>
          </Col>
        </Row>
        </Row>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ChatCard);