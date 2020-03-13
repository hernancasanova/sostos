import React from 'react';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import GoBack from '../../../components/GoBack';
import { validateHistory, valdiateRepository } from '../../../validators';
import FileItem from './fileItem';
import PATHS from '../../../paths';
import NewButton from '../../../components/Buttons/NewButton';

const files = [
  {
    id: 1,
    name: 'Guia Unidad I',
    questions: 3
  },
  {
    id: 2,
    name: 'Guia Unidad II',
    questions: 15
  },
  {
    id: 3,
    name: 'Guia Unidad III',
    questions: 22
  }
];

const Item = props => {
  const { history, repository } = props;
  if (typeof repository === 'undefined') {
    return false;
  }
  const { name } = repository;
  return (
    <Container>
      <Row>
        <Col>
          <GoBack history={history} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{name}</h3>
        </Col>
      </Row>
      <Row className="welcome-row">
        <Col className="welcome-col">
          <div className="card-deck repository-card-deck">
            {files.map(file => (
              <FileItem
                url={PATHS.FILES}
                key={file.id}
                name={file.name}
                questions={file.questions}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <NewButton
            className="float-left MyEnterprisesNewButton custom-shadow"
            text="Crear Documento"
            url={PATHS.REPOSITORIES_CREATE}
          />
          <NewButton
            className="float-left MyEnterprisesNewButton custom-shadow test-button-2"
            text="Crear Fórmula"
            url={PATHS.REPOSITORIES_FORMULA}
          />
        </Col>
      </Row>
    </Container>
  );
};

Item.propTypes = {
  history: validateHistory.isRequired,
  repository: PropTypes.oneOfType([valdiateRepository, PropTypes.bool]).isRequired
};

export default Item;
