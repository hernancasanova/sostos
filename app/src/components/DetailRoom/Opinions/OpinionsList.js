
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Col, Row, Label
} from 'reactstrap';
import './style.css';
import OpinionCard from './OpinionCard';

class OpinionList extends Component {
  render() {
    const items = this.props.items;

    const opinions = items.map(
      (item, index) => <OpinionCard key={`opinion-card-${index}`} item={item} />
    );


    return (
      <React.Fragment>
        <Col className="body-opinion-list">
          <Row className="opinions_title_container">
            <div>
              <h5>
                <FormattedMessage
                  id="opinions.title"
                  defaultMessage="Opinions"
                />
              </h5>
            </div>
            <div>
              <h5>
                {items.length}
                {' '}
                <FormattedMessage
                  id="opinions.comments"
                  defaultMessage="Comments"
                />
              </h5>
            </div>
          </Row>
          <Row>{opinions}</Row>
        </Col>
      </React.Fragment>
    );
  }
}


export default OpinionList;
