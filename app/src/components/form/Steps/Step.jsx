import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from '../Icon';

const renderStepLine = (props, className) => {
  if (!props.last) {
    return <div className={`step-line ${className} ${props.type}`} />;
  }
};

const renderStep = props => {
  const { FormattedMessageId, defaultMessage, iconId, active, finished } = this.props;
  if (iconId && finished) {
    return (
      <div className="step-wrapper">
        {renderStepLine(props, 'finished')}
        <div className="step_circle finished">
          <div className="step">
            <Icon id={iconId} color="#00ac67" height="20px" width="20px" />
          </div>
        </div>
        <div className="step-text">
          <FormattedMessage id={FormattedMessageId} defaultMessage={defaultMessage} />
        </div>
      </div>
    );
  }
  if (iconId && active) {
    return (
      <div className="step-wrapper">
        {renderStepLine(props, 'active')}
        <div className="step_circle active">
          <div className="step">
            <Icon id={iconId} color="#cda555" height="20px" width="20px" />
          </div>
        </div>
        <div className="step-text">{defaultMessage}</div>
      </div>
    );
  }
  if (iconId && !active && !finished) {
    return (
      <div className="step-wrapper">
        {renderStepLine(props, '')}
        <div className="step_circle">
          <div className="step">
            <Icon id={iconId} color="gray" height="20px" width="20px" />
          </div>
        </div>
        <div className="step-text">{defaultMessage}</div>
      </div>
    );
  }
};

const Step = props => <React.Fragment>{renderStep(props)}</React.Fragment>;

export default Step;
