import { Component } from 'react';
import { connect } from 'react-redux';
import {
  verification,
  verificationPasswordChanged,
  verificationPasswordConfirmationChanged
} from '../../actions/index';

class Verification extends Component {
  onPasswordChange(event) {
    const { verificationPasswordChanged } = this.props;
    verificationPasswordChanged(event.target.value);
  }

  onPasswordConfirmationChange(event) {
    const { verificationPasswordConfirmationChanged } = this.props;
    verificationPasswordConfirmationChanged(event.target.value);
  }

  verification() {
    this.props.verification(
      this.props.match.params.token,
      this.props.password,
      this.props.passwordConfirmation
    );
  }

  gotoLogin() {
    this.props.history.push('/');
  }

  gotoSignup() {
    this.props.history.push('/signup');
  }

  renderError() {
    // TOOD: Maybe this message could replace signup form
    // TODO: Check how add key in the list of errors to clean warning!
    if (this.props.errors != null) {
      // var errors = global._.values(this.props.errors);
    }
  }
}

const mapStateToProps = state => ({
  password: state.verification.password,
  passwordConfirmation: state.verification.passwordConfirmation,
  data: state.verification.data,
  errors: state.verification.errors,
  loading: state.verification.loading
});

export default connect(
  mapStateToProps,
  { verification, verificationPasswordChanged, verificationPasswordConfirmationChanged }
)(Verification);
