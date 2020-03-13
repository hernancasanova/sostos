import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import UserMenu from '../../../components/header/UserMenu';
import { validateUser, validateHistory } from '../../../validators';

class SubHeader extends PureComponent {
  render() {
    const { user, history, validated, logout } = this.props;
    if (validated) {
      return (
        <Col md="12">
          <p className="ApplicationNameTitle" />
          <UserMenu logout={logout} history={history} user={user} />
        </Col>
      );
    }
    return false;
  }
}

SubHeader.defaultProps = {
  user: null
};

SubHeader.propTypes = {
  user: validateUser,
  logout: PropTypes.func.isRequired,
  history: validateHistory.isRequired,
  validated: PropTypes.bool.isRequired
};

export default SubHeader;
