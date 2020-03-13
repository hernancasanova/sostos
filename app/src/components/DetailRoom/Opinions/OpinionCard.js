
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';
import moment from 'moment';
import 'moment/locale/es';
import iconStar from '../../../assets/icons/lo-icon-star.svg';

class OpinionCard extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <React.Fragment>
        <Col className="body-opinion-card">
          <Row className="inner_first_row">
            <Col xs="2" sm="1" className="remove-padding-img">
              <Col className="remove-padding-img">
                <img
                  className="thumbnail-img-round"
                  src={!this.props.item.userId.picture ? this.props.item.userId.picture : 'https://lorempixel.com/400/400'}
                  alt={this.props.item.altText}
                />
              </Col>
            </Col>

            <Col xs="10" sm="11">
              <Row className="name_container">
                <Col xs="8" className="align-left-card">
                  {this.props.item.firsName ? this.props.item.userId.firsName : this.props.item.userId.email}
                </Col>

                <Col xs="4" sm="4" className="align-right-card">
                  <Row className="align-valoration-right">
                    <SVG className="lo-icon-card iconStar" src={iconStar} />
                    <h6 className="stars-rating">10</h6>
                  </Row>
                </Col>
              </Row>

              <Row className="date_container">
                <Col xs="12" className="align-left-card">
                  { moment(this.props.item.date_comment, 'YYYY-MM-DD').locale('es').format('DD MMM YYYY')}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="margin-top-opinion">
            {this.props.item.message}
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}


export default OpinionCard;
