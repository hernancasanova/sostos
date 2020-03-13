import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import MainContent from './mainContent';
import '../styles.css';
import '../../../fonts.css';
import { validateUser } from '../../../validators';

class Master extends Component {
  constructor(props) {
    super(props);
    this.renderFooter = this.renderFooter.bind(this);
  }

  renderFooter() {
    const { location } = this.props;
    const { pathname } = location;
    const availablePaths = ['confirmed', 'success', 'search', 'home', 'checkout'];
    const subs = pathname.substr(1, pathname.lenght);
    let path = '';
    if (subs.indexOf('/') !== -1) {
      const index = subs.indexOf('/');
      path = subs.substr(0, index);
    } else {
      path = subs;
    }
    if (availablePaths.includes(path)) {
      return <Footer />;
    }
    return false;
  }

  render() {
    const { aside, children, location, dispatch, token, user, loadingEnterprises } = this.props;
    return (
      <React.Fragment>
        <MainContent
          token={token}
          aside={aside}
          location={location}
          dispatch={dispatch}
          user={user}
          loadingEnterprises={loadingEnterprises}
        >
          {children}
        </MainContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  burgerMenu: state.burgerMenu,
  // ↓ Agregado por mi
  user: state.auth.user,
  isLoginModalOpen: state.aside.isLoginModalOpen,
  isSignUpModalOpen: state.aside.isSignUpModalOpen,
  //
  dispatch: PropTypes.func.isRequired
});

export default connect(mapStateToProps)(Master);

Master.propTypes = {
  token: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  aside: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  loadingEnterprises: PropTypes.bool.isRequired,
  user: validateUser.isRequired
};
