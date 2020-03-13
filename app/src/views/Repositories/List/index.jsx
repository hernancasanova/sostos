import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Item from './item';
import NewButton from '../../../components/Buttons/NewButton';
import PATHS from '../../../paths';
import GoBack from '../../../components/GoBack';
import { validateHistory } from '../../../validators';

const List = props => {
  const { cards, history } = props;
  return (
    <Container className="welcome-container">
      <Row>
        <Col>
          <GoBack history={history} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="float-left">Administrar Repositorios</h3>

          <NewButton
            className="float-right MyEnterprisesNewButton custom-shadow"
            text="Agregar Repositorio"
            url={PATHS.REPOSITORIES_ADD}
          />
        </Col>
      </Row>
      <Row className="welcome-row">
        <Col className="welcome-col">
          <div className="card-deck welcome-card-deck">
            {cards.map(card => (
              <Item
                key={card.id}
                url={card.url}
                icon={card.icon}
                name={card.name}
                files={card.files}
                description={card.description}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

List.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  history: validateHistory.isRequired
};

export default List;
