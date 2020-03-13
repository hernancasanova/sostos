import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import UserMenu from '../../../components/header/UserMenu';
import { validateUser } from '../../../validators';

const Header = props => {
  const { token, user, picture, name, email, toggleSignUp, toggleLogin } = props;
  if (token != null) {
    if (user) {
      return (
        <Col md="12">
          <p className="ApplicationNameTitle" />
          <UserMenu {...props} imgSrc={picture} userName={name} userEmail={email} />
        </Col>
      );
    }
  }
  return (
    <div className="clearfix header_not_logged_container">
      <Col sm="8" className="links_container" />
      {token === null ? (
        <div className="pull-right header_right">
          <button type="button" className="header_link" onClick={e => toggleSignUp(e)}>
            <FormattedMessage id="header.register" defaultMessage="Register" />
          </button>
          <button type="button" className="header_big_button " onClick={e => toggleLogin(e)}>
            <FormattedMessage id="header.login" defaultMessage="Login" />
          </button>
        </div>
      ) : (
        <UserMenu {...props} imgSrc={user.picture} userName={user.name} userEmail={user.email} />
      )}
    </div>
  );
};

Header.defaultProps = {
  user: false,
  email: '',
  picture: '',
  name: ''
};

Header.propTypes = {
  token: PropTypes.string.isRequired,
  user: validateUser,
  email: PropTypes.string,
  picture: PropTypes.string,
  name: PropTypes.string,
  toggleSignUp: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired
};

export default Header;
