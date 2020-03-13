import React from 'react';

import './estilo.css';
import imgBack from '../../../assets/png/back_button.png';
import { validateHistory } from '../../../validators';

const BackButton = props => {
  const { history } = props;
  return (
    <React.Fragment>
      <button type="button" onClick={history.goBack} className="back-button">
        <img src={imgBack} alt="back-button" />
        Regresar
      </button>
    </React.Fragment>
  );
};

BackButton.propTypes = {
  history: validateHistory.isRequired
};

export default BackButton;
