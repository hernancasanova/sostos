import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Item = props => {
  const { url, icon, title } = props;
  return (
    <Link to={url}>
      <Card key={title} className="welcome-card">
        {icon}
        <Card.Title className="welcome-card-title">{title}</Card.Title>
      </Card>
    </Link>
  );
};

Item.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Item;
