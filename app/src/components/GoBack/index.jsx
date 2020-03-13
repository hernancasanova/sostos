/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { validateHistory } from '../../validators';
// import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

const GoBack = props => {
  const { history } = props;
  return (
    <Row className="go-back-row">
      <Col className="go-back-col">
        <span className="go-back-span" onClick={() => history.goBack()}>
          ← Regresar
        </span>
      </Col>
    </Row>
  );
};

GoBack.propTypes = {
  history: validateHistory.isRequired
};

export default GoBack;
