import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { validateObjective, validateRepositories } from '../../../validators';
import Error from '../../../components/Common/SVG/error';
import PATHS from '../../../paths';

// class ObjectiveRow extends Component {
class ObjectiveRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { objective, removeSubtopicObjective, id, repositories } = this.props;
    const { visible } = this.state;
    const { name, description } = objective;
    return (
      <React.Fragment>
        <tr>
          <td valign="middle" style={{ fontWeight: 'bold', color: '#808182' }}>
            <Button
              style={repositories.length > 0 ? {} : { visibility: 'hidden' }}
              className="topics-subtopics-objectives-table-visible custom-shadow"
              onClick={() => this.setState({ visible: !visible })}
            >
              {visible ? '-' : '+'}
            </Button>
            <Link to={`${PATHS.OBJECTIVES_PRE_SINGLE}${objective.id}`}>
              <span style={{ color: '#808182' }}>{name}</span>
            </Link>
          </td>
          <td>{description}</td>
          <td style={{ width: '130px', textAlign: 'center' }}>
            <div
              tabIndex={id}
              role="button"
              className="custom-shadow noselect"
              style={{
                margin: 'auto',
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                borderRadius: '100px'
              }}
              onKeyUp={() => removeSubtopicObjective(id, objective.id)}
              onClick={() => removeSubtopicObjective(id, objective.id)}
            >
              <Error />
            </div>
          </td>
        </tr>
        {visible &&
          repositories.map(repository => (
            <tr key={repository.id}>
              <td style={{ paddingLeft: '55px', textAlign: 'left' }} colSpan="3">
                <Link to={`${PATHS.REPOSITORIES_PRE_SINGLE}${repository.id}`}>
                  <span style={{ fontWeight: 'bold', color: '#808182' }}>{repository.name}</span>
                </Link>
              </td>
            </tr>
          ))}
      </React.Fragment>
    );
  }
}

ObjectiveRow.propTypes = {
  objective: validateObjective.isRequired,
  removeSubtopicObjective: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  repositories: validateRepositories.isRequired
};

export default ObjectiveRow;
