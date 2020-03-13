/* eslint-disable no-undef */
import { push } from 'react-router-redux';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  AUTH_SIGNIN,
  AUTH_GET_ME,
  AUTH_LOGOUT,
  AUTH_SIGNUP_REQUEST,
  AUTH_VERIFICATION_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILED,
  AUTH_SIGNUP_REQUEST_SUCCESS,
  AUTH_SIGNUP_REQUEST_FAILED,
  AUTH_VERIFICATION_REQUEST_SUCCESS,
  AUTH_VERIFICATION_REQUEST_FAILED,
  AUTH_GET_ME_SUCCESS,
  AUTH_GET_ME_FAILED,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED,
  PROFILE_GET_ME_SUCCESS,
  MODAL_LOGIN_IS_OPEN
} from '../actions/types';
import { post } from '../services/api';
import history from '../history';
import PATHS from '../paths';

function* signIn({ payload }) {
  try {
    const data = {
      email: payload.email,
      password: payload.password
    };
    const response = yield call(post, 'auth/login', data);
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('token.expiresIn', response.data.expires_in);
    yield put({ type: AUTH_REQUEST_SUCCESS, payload: response.data });
    yield put({ type: MODAL_LOGIN_IS_OPEN });
    yield put(push(PATHS.HOME));
  } catch (error) {
    yield put({ type: AUTH_REQUEST_FAILED, payload: error.data });
    localStorage.removeItem('token');
  }
}

/* Register new user */
function* signUp({ payload }) {
  try {
    const data = {
      name: payload.name,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      birthDate: payload.birthDate,
      bulletin: payload.bulletin
    };
    const user = yield call(post, 'auth/register', data);
    yield put({ type: AUTH_SIGNUP_REQUEST_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: AUTH_SIGNUP_REQUEST_FAILED, payload: error });
  }
}

function* verification({ payload }) {
  try {
    const request = {
      verification_token: payload.token,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation
    };
    const data = yield call(post, 'jwt/verification', request);
    yield put({ type: AUTH_VERIFICATION_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AUTH_VERIFICATION_REQUEST_FAILED, payload: error });
  }
}

function* getMe({ payload }) {
  try {
    const data = { access_token: payload };
    const user = yield call(post, 'auth/me', data);
    yield put({ type: AUTH_GET_ME_SUCCESS, payload: user });
    yield put({ type: PROFILE_GET_ME_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: AUTH_GET_ME_FAILED, payload: error });
    localStorage.removeItem('token');
  }
}

function* logout() {
  try {
    localStorage.removeItem('token');
    yield put({ type: AUTH_LOGOUT_SUCCESS, payload: '' });
    yield call(history.push, '/login');
  } catch (error) {
    yield put({ type: AUTH_LOGOUT_FAILED, payload: error });
    yield call(history.push, '/login');
  }
}

export const authSagas = [
  takeLatest(AUTH_SIGNIN, signIn),
  takeEvery(AUTH_GET_ME, getMe),
  takeLatest(AUTH_LOGOUT, logout),
  takeLatest(AUTH_SIGNUP_REQUEST, signUp),
  takeLatest(AUTH_VERIFICATION_REQUEST, verification)
];
