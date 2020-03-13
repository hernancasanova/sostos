import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Master } from '../../containers';
import { getMe } from '../../actions/AuthActions';
import { validateUser } from '../../validators';

class Home extends Component {
  constructor(props) {
    super(props);
    const { token, user } = props;
    if (token && !user) {
      getMe(token);
    }
  }

  render() {
    return <Master {...this.props} />;
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getMe }
)(Home);

Home.propTypes = {
  token: PropTypes.string.isRequired,
  user: validateUser.isRequired
};
