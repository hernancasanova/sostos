import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Item(props) {
  const { active, label, svg, children, url } = props;
  return (
    <li className="nav-item ">
      <Link to={url}>
        <button type="button" className={`aside_link ${active ? 'active' : ''}`}>
          <div className="aside-menu-item-contenedor row">
            <div className="aside-menu-item-icon-contenedor">{svg}</div>
            <div className="aside-menu-item-label">{label}</div>
          </div>
        </button>
      </Link>
      {children !== false && <ul>{children}</ul>}
    </li>
  );
}

Item.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.bool]),
  url: PropTypes.string,
  svg: PropTypes.node.isRequired
};

Item.defaultProps = {
  children: false,
  url: '/'
};

export default Item;
