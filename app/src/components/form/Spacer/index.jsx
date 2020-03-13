import React from 'react';
import './estilo.css';

const renderSpacer = () => {
  return <div className="spacer" />;
};

const Linebreak = props => <React.Fragment>{renderSpacer(props)}</React.Fragment>;

export default Linebreak;
