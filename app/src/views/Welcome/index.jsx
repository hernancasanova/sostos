import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainContent from '../../containers/layouts/Master/mainContent';
import CorregirEvaluacionSvg from './corregirEvaluacionSvg';
import EvaluacionSvg from './evaluacionSvg';
import RepositorioSvg from './repositorioSvg';
import NotaSvg from './notaSvg';
import AsistenteSvg from './asistenteSvg';
import InstitucionSvg from './institucionSvg';
import GrupoSvg from './grupoSvg';
import TemaSvg from './temaSvg';
import UsuarioSvg from './usuarioSvg';
import PATHS from '../../paths';
import Item from './item';

const cards = [
  { icon: <CorregirEvaluacionSvg />, title: 'Corregir Evaluación', url: PATHS.HOME },
  { icon: <EvaluacionSvg />, title: 'Evaluaciones', url: PATHS.EVALUATIONS },
  { icon: <RepositorioSvg />, title: 'Repositorios', url: PATHS.REPOSITORIES },
  { icon: <NotaSvg />, title: 'Notas', url: PATHS.HOME },
  { icon: <AsistenteSvg />, title: 'Administrar Asistentes', url: PATHS.ATTENDEES },
  { icon: <InstitucionSvg />, title: 'Administrar Instituciones', url: PATHS.INSTITUTIONS },
  { icon: <GrupoSvg />, title: 'Administrar Grupos', url: PATHS.GROUPS },
  { icon: <TemaSvg />, title: 'Administrar Temas', url: PATHS.TOPICS },
  { icon: <UsuarioSvg />, title: 'Administrar Usuarios', url: PATHS.HOME }
];

const Welcome = () => {
  return (
    <MainContent token aside>
      <Container className="welcome-container">
        <Row className="welcome-row">
          <Col className="welcome-col">
            <div className="card-deck welcome-card-deck">
              {cards.map(card => (
                <Item
                  key={`${card.title}-${card.url}`}
                  url={card.url}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </MainContent>
  );
};

export default Welcome;
