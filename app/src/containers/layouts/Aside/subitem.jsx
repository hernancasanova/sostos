import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Subitem(props) {
  const { label, url, active } = props;
  return (
    <Link className="nofocus" to={url}>
      <li>
        <button
          type="button"
          className={`${active ? 'subButton subButtonActive nofocus' : 'subButton nofocus'}`}
        >
          <span>{label}</span>
        </button>
      </li>
    </Link>
  );
}

export default Subitem;

Subitem.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};
