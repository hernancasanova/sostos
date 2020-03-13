import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Col, Row, Label, Card, CardBody, CardImg, CardFooter, CardHeader
} from 'reactstrap';

import './Confirm.css';
import NewButton from '../../Buttons/NewButton';
import CheckIcon from '../AnimatedIcon/CheckIcon';

class Confirm extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <Card className="ConfirmContainer">
        <CheckIcon/>
        
        <CardBody className="ConfirmCardBody">
          <div className="ConfirmBodyTitle">
            {this.props.name}
          </div>
          <div className="ConfirmBodyMessage">
            {this.props.text}
          </div>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, {
  
})(Confirm);
