import React, { Component } from 'react';
import { Card, CardBody, CardImg } from 'reactstrap';
import PropTypes from 'prop-types';
import './estilo.css';
import PATHS from '../../paths';
import { validateHistory } from '../../validators';

class SelectEnterpriseLink extends Component {
  constructor(props) {
    super(props);
    this.selectEnterprise = this.selectEnterprise.bind(this);
  }

  selectEnterprise(param) {
    const { setSelectedEnterprise, history } = this.props;
    setSelectedEnterprise(param);
    history.push(PATHS.EMPLOYEES);
  }

  render() {
    const { id, img, name } = this.props;
    return (
      <Card className="SelectEnterpriseLinkContainer" onClick={() => this.selectEnterprise(id)}>
        <CardImg className="SelectEnterpriseLinkIcon" src={img} />
        <CardBody className="SelectEnterpriseLinkBody">{name}</CardBody>
      </Card>
    );
  }
}

SelectEnterpriseLink.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: validateHistory.isRequired,
  setSelectedEnterprise: PropTypes.func.isRequired
};

export default SelectEnterpriseLink;
