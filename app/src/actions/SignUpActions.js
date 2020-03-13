import {
  AUTH_SIGNUP_EMAIL_CHANGED,
  AUTH_SIGNUP_NAME_CHANGED,
  AUTH_SIGNUP_LAST_NAME_CHANGED,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_RESET,
  AUTH_SIGNUP_PASSWORD_CHANGED,
  AUTH_SIGNUP_CONFIRMED_PASSWORD_CHANGED,
  AUTH_SIGNUP_BIRTH_DATE_CHANGED,
  AUTH_SIGNUP_BULLETIN_CHANGED
} from './types';

export const signUp = (name, lastName, email, password, birthDate) => ({
  type: AUTH_SIGNUP_REQUEST,
  payload: {
    name,
    lastName,
    email,
    password,
    birthDate
  }
});

export const emailSignUpChanged = text => ({
  type: AUTH_SIGNUP_EMAIL_CHANGED,
  payload: text
});

export const nameSignUpChanged = text => ({
  type: AUTH_SIGNUP_NAME_CHANGED,
  payload: text
});

export const lastNameSignUpChanged = text => ({
  type: AUTH_SIGNUP_LAST_NAME_CHANGED,
  payload: text
});

export const passwordSignUpChanged = text => ({
  type: AUTH_SIGNUP_PASSWORD_CHANGED,
  payload: text
});

export const confirmedPasswordSignUpChanged = text => ({
  type: AUTH_SIGNUP_CONFIRMED_PASSWORD_CHANGED,
  payload: text
});

export const birthDateSignUpChanged = text => ({
  type: AUTH_SIGNUP_BIRTH_DATE_CHANGED,
  payload: text
});

export const bulletinSignUpChanged = text => ({
  type: AUTH_SIGNUP_BULLETIN_CHANGED,
  payload: text
});

export const signUpReset = () => ({
  type: AUTH_SIGNUP_RESET
});
