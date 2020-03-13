import _ from 'lodash';
import React, { Component } from 'react';
import Step from './Step';
import './style.css';

class Steps extends Component {
  static isActive(step, current) {
    if (step.step === current) {
      return true;
    }
    return false;
  }

  static isFinished(step, current) {
    if (step.step < current) {
      return true;
    }
    return false;
  }

  static isLast(steps, step) {
    if (steps.length === step.step) {
      return true;
    }
    return false;
  }

  renderSteps(props) {
    const { type } = this.props;
    let steps;
    switch (type) {
      case 'room':
        steps = [
          {
            step: 1,
            FormattedMessageId: 'steps.profile',
            defaultMessage: 'Profile'
          },
          {
            step: 2,
            FormattedMessageId: 'steps.distribution',
            defaultMessage: 'Distribution'
          },
          {
            step: 3,
            FormattedMessageId: 'steps.services',
            defaultMessage: 'Services'
          },
          {
            step: 4,
            FormattedMessageId: 'steps.aditionals',
            defaultMessage: 'Aditionals'
          },
          {
            step: 5,
            FormattedMessageId: 'steps.pictures',
            defaultMessage: 'Pictures'
          },
          {
            step: 6,
            FormattedMessageId: 'steps.conditions',
            defaultMessage: 'Conditions'
          },
          {
            step: 7,
            FormattedMessageId: 'steps.revision',
            defaultMessage: 'Revision'
          }
        ];
        break;
      case 'boat':
        steps = [
          {
            step: 1,
            FormattedMessageId: 'boat_steps.profile',
            defaultMessage: 'Profile'
          },
          {
            step: 2,
            FormattedMessageId: 'boat_steps.aditionals',
            defaultMessage: 'Aditionals'
          },
          {
            step: 3,
            FormattedMessageId: 'boat_steps.services_and_pictures',
            defaultMessage: 'Services and pictures'
          },
          {
            step: 4,
            FormattedMessageId: 'boat_steps.revision',
            defaultMessage: 'Revision'
          }
        ];
        break;
      default:
        steps = [];
        break;
    }
    const output = _.map(steps, step => (
      <Step
        key={`step__${step.FormattedMessageId}`}
        iconId="lo-icon-check"
        active={this.isActive(step, props.current)}
        finished={this.isFinished(step, props.current)}
        last={this.isLast(steps, step)}
        FormattedMessageId={step.FormattedMessageId}
        defaultMessage={step.defaultMessage}
        type={this.props.type}
      />
    ));

    return output;
  }

  render() {
    return <div className="steps_container">{this.renderSteps(this.props)}</div>;
  }
}

export default Steps;
