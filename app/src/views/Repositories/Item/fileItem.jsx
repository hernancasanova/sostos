import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import FileSVG from './file';

const Item = props => {
  const { url, name, description, questions } = props;
  return (
    <Link to={url}>
      <Card key={name} className="repository-card">
        <Row style={{ width: '100%' }}>
          <Col className="repository-file-container">
            <FileSVG />
          </Col>
          <Col className="repository-file-card-col">
            <Row>
              <Col className="repository-file-card-title-col">
                <Card.Title className="repository-file-card-title">{name}</Card.Title>
              </Col>
            </Row>
            <Row>
              <Col className="repository-file-card-title-col">
                <Card.Title className="repository-file-card-subtitle">
                  {questions === 1 ? '1 pregunta' : `${questions} preguntas`}
                </Card.Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Card.Text className="repositories-card-text">{description}</Card.Text>
      </Card>
    </Link>
  );
};

Item.defaultProps = {
  description: ''
};

Item.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  questions: PropTypes.number.isRequired
};

export default Item;
