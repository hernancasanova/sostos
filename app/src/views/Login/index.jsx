import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Alert, Button, Col, Row } from 'reactstrap';
import { Input } from '../../components/form';
import './style.css';
import { emailAuthChanged, passwordAuthChanged, signIn } from '../../actions/AuthActions';

class Login extends Component {
  onEmailChange(event) {
    const { emailAuthChanged } = this.props;
    emailAuthChanged(event.target.value);
  }

  onPasswordChange(event) {
    const { passwordAuthChanged } = this.props;
    passwordAuthChanged(event.target.value);
  }

  onRememberMeChange(event) {
    event.preventDefault();
  }

  /* Login through reducer */
  signIn() {
    const { email, password, signIn } = this.props;
    signIn(email, password);
  }

  responseGoogle(response) {
    const { signInWithGoogle } = this.props;
    signInWithGoogle(response);
  }

  /* Login through Facebook reducer */
  responseFacebook(response) {
    const { signInWithFacebook } = this.props;
    signInWithFacebook(response);
  }

  handleSignUp(event) {
    const { history } = this.props;
    event.preventDefault();
    history.replace('/signup');
  }

  handleForgotPassword(event) {
    const { history } = this.props;
    event.preventDefault();
    history.push('/signup');
  }

  renderError() {
    const { errors } = this.props;
    if (_.size(errors) > 0) {
      return <Alert color="danger">{errors.message}</Alert>;
    }
  }

  render() {
    const { email, errors, password } = this.props;
    return (
      <div className="loginViewContainer">
        <div className="loginFormContainer">
          <h4 className="loginTitle">
            <FormattedMessage id="login.title" defaultMessage="Login to your account" />
          </h4>

          <Input
            id="email"
            ionicon="ios-mail-outline"
            type="text"
            placeholder="login.email"
            value={email}
            onChange={e => this.onEmailChange(e)}
            errors={errors}
          />

          <Input
            id="password"
            ionicon="ios-lock-outline"
            type="password"
            placeholder="login.password"
            value={password}
            onChange={e => this.onPasswordChange(e)}
            errors={errors}
          />

          <Row className="remember-me-forgot-password">
            <Col xs="7" className="fix-checkbox-align">
              <Input
                type="checkbox"
                className="fixed-checkbox"
                onChange={e => this.onRememberMeChange(e)}
              />
              <div className="fixed-checkbox-text">
                <FormattedMessage id="login.remember_me" defaultMessage="I want to register!" />
              </div>
            </Col>

            <Col xs="5" className="text-right">
              <button
                type="button"
                className="link-primary login"
                onClick={e => this.handleForgotPassword(e)}
              >
                <FormattedMessage id="login.forgot_password" defaultMessage="I want to register!" />
              </button>
            </Col>
          </Row>

          <Button className="button-primary login" onClick={e => this.signIn(e)}>
            <FormattedMessage id="login.login_button" defaultMessage="Login" />
          </Button>

          <p className="align-center p2">
            <FormattedMessage
              id="login.bottom_message"
              defaultMessage="I don't have an account. "
            />
            <button
              type="button"
              onClick={e => this.handleSignUp(e)}
              className="link-primary register"
            >
              <FormattedMessage id="login.bottom_message_2" defaultMessage="I want to register!" />
            </button>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  data: state.auth.data,
  errors: state.auth.errors,
  loading: state.auth.loading,
  token: state.auth.token,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    emailAuthChanged,
    passwordAuthChanged,
    signIn
  }
)(Login);
