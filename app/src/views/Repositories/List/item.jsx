import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Notification from './notification';

const Item = props => {
  const { url, icon, name, description, files } = props;
  return (
    <Link to={url}>
      <Card key={name} className="repositories-card">
        <div className="repositories-card-notification">
          <Notification />
          <div className="repositories-card-notification-text">{files}</div>
        </div>
        {icon}
        <Card.Title className="repositories-card-title">{name}</Card.Title>
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
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  files: PropTypes.number.isRequired,
  description: PropTypes.string
};

export default Item;
