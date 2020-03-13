import {
  AUTH_VERIFICATION_REQUEST,
  AUTH_VERIFICATION_PASSWORD_CHANGED,
  AUTH_VERIFICATION_PASSWORD_CONFIRMATION_CHANGED
} from './types';

export const verification = (token, password, passwordConfirmation) => {
  return {
    type: AUTH_VERIFICATION_REQUEST,
    payload: { token, password, passwordConfirmation }
  };
};

export const verificationPasswordChanged = text => {
  return {
    type: AUTH_VERIFICATION_PASSWORD_CHANGED,
    payload: text
  };
};

export const verificationPasswordConfirmationChanged = text => {
  return {
    type: AUTH_VERIFICATION_PASSWORD_CONFIRMATION_CHANGED,
    payload: text
  };
};
