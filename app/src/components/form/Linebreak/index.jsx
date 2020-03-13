import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './style.css';

const Linebreak = props => {
  const { FormattedMessageId, defaultMessage } = props;
  if (FormattedMessageId) {
    return (
      <div className="linebreak-wrapper">
        <div className="linebreak" />
        <p>
          <FormattedMessage id={FormattedMessageId} defaultMessage={defaultMessage} />
        </p>
        <div className="linebreak" />
      </div>
    );
  }
  return (
    <div className="linebreak-wrapper">
      <br />
      <div className="linebreak" />
    </div>
  );
};

Linebreak.propTypes = {
  FormattedMessageId: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired
};

export default Linebreak;
