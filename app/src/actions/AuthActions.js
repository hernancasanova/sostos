import {
  AUTH_EMAIL_CHANGED,
  AUTH_PASSWORD_CHANGED,
  AUTH_SIGNIN,
  AUTH_GET_ME,
  AUTH_GOOGLE_SIGNIN,
  AUTH_FACEBOOK_SIGNIN,
  AUTH_LOGOUT,
  MODAL_LOGIN_IS_OPEN,
  MODAL_SIGN_UP_IS_OPEN
} from './types';

export const emailAuthChanged = text => ({
  type: AUTH_EMAIL_CHANGED,
  payload: text
});

export const passwordAuthChanged = text => ({
  type: AUTH_PASSWORD_CHANGED,
  payload: text
});

export const signIn = (email, password) => ({
  type: AUTH_SIGNIN,
  payload: { email, password }
});

export const signInWithFacebook = facebookResponse => ({
  type: AUTH_FACEBOOK_SIGNIN,
  payload: facebookResponse
});

export const signInWithGoogle = googleResponse => ({
  type: AUTH_GOOGLE_SIGNIN,
  payload: googleResponse
});

export const getMe = accessToken => ({
  type: AUTH_GET_ME,
  payload: accessToken
});

export const logout = () => ({
  type: AUTH_LOGOUT,
  payload: ''
});

export const toggleLoginModal = isOpen => ({
  type: MODAL_LOGIN_IS_OPEN,
  payload: isOpen
});

export const toggleSignUpModal = isOpen => ({
  type: MODAL_SIGN_UP_IS_OPEN,
  payload: isOpen
});
