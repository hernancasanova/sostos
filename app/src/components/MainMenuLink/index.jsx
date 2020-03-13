import React from 'react';
// import { Card, CardBody, CardImg } from 'reactstrap';
import { Card, CardBody, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './estilo.css';

const MainMenuLink = props => {
  const { img, name, url } = props;
  return (
    <Link to={url}>
      <Card className="MainMenuLinkContainer">
        <CardImg className="MainMenuLinkIcon" src={img} />
        <CardBody className="MainMenuLinkBody">{name}</CardBody>
      </Card>
    </Link>
  );
};

export default MainMenuLink;

MainMenuLink.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
