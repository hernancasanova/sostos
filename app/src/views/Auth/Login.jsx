import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/core';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import { Input } from '../../components/form';
import { validateHistory } from '../../validators';

const override = css`
  display: block;
  margin: auto;
  border-color: red;
  margin-bottom: 32px;
  margin-top: 16px;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    const { email, password } = this.state;
    const { signIn } = this.props;
    signIn(email, password);
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

  render() {
    const { email, password } = this.state;
    const { loading, errors } = this.props;
    const { error } = errors;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <h4>
                <FormattedMessage id="login.title" defaultMessage="Login to your account" />
              </h4>
              <br />
              {error && <Alert color="danger">{error}</Alert>}
              <Input
                id="email"
                ionicon="ios-mail-outline"
                type="text"
                placeholder="login.email"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                errors={errors}
              />
              <Input
                id="password"
                ionicon="ios-lock-outline"
                type="password"
                placeholder="login.password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                errors={errors}
              />
              <Row className="remember-me-forgot-password">
                <Col xs="6">
                  <Input
                    value={false}
                    onChange={() => console.log('Checkbox sin función asignada')}
                    type="checkbox"
                    className="fixed-checkbox"
                  />
                  <div className="fixed-checkbox-text">
                    <FormattedMessage id="login.remember_me" defaultMessage="I want to register!" />
                  </div>
                </Col>
                <Col xs="6" className="text-right">
                  <button
                    type="button"
                    className="link-primary"
                    onClick={e => this.handleForgotPassword(e)}
                  >
                    <FormattedMessage
                      id="login.forgot_password"
                      defaultMessage="I want to register!"
                    />
                  </button>
                </Col>
              </Row>
              <Row>
                <BarLoader
                  css={override}
                  sizeUnit="px"
                  color="#1F72AB"
                  width={500}
                  height={10}
                  loading={loading}
                />
              </Row>
              <Button className="button-primary" onClick={this.signIn}>
                <FormattedMessage id="login.login_button" defaultMessage="Login" />
              </Button>
              <p className="align-center p2">
                <FormattedMessage
                  id="login.bottom_message"
                  defaultMessage="I don't have an account."
                />
                <button type="button" onClick={e => this.handleSignUp(e)} className="link-primary">
                  <FormattedMessage
                    id="login.bottom_message_2"
                    defaultMessage="I want to register!"
                  />
                </button>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      error: PropTypes.string
    })
  ]).isRequired,
  history: validateHistory.isRequired,
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired
};

export default Login;
