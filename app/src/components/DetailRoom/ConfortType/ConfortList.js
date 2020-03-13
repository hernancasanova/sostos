import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';

class ConfortList extends Component {
  constructor(props) {
    super(props);
  }

  renderCardItem(item, index) {
    return (
      <Col sm="3" key={`confort-card-${index}`}>
        <div><img className="thumbnail-img" src={item.src} alt={item.altText} /></div>
        <div>
          {`Simbolo ${index + 1}`}
        </div>
      </Col>
    );
  }

  render() {
    const items = this.props.items;

    const conforts = items.map((item, index) => this.renderCardItem(item, index));

    return (
      <React.Fragment>
        <Row className="body-confort-list">
          {conforts}
        </Row>
      </React.Fragment>
    );
  }
}


export default ConfortList;
