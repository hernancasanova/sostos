import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  USER_LIST_REQUEST,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  USER_CREATE_REQUEST,
  USER_CREATE_FAILED,
  USER_CREATE_SUCCESS,
  USER_GET_REQUEST,
  USER_GET_FAILED,
  USER_GET_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS
} from '../actions/types';
import { post, get, put as putrequest } from '../services/api';

function* index({ payload }) {
  try {
    const request = {
      params: {}
    };
    const url = 'users';
    const datas = yield call(get, url, request);
    yield put({ type: USER_LIST_SUCCESS, payload: datas });
  } catch (error) {
    yield put({ type: USER_LIST_FAILED, payload: error });
  }
}

function* store({ payload }) {
  try {
    const request = payload;
    const url = 'users';
    const datas = yield call(post, url, request);
    yield put({ type: USER_CREATE_SUCCESS, payload: datas });
  } catch (error) {
    yield put({ type: USER_CREATE_FAILED, payload: error });
  }
}

function* update({ payload }) {
  try {
    const request = payload;
    const url = `users/${payload.id}`;
    const datas = yield call(putrequest, url, request);
    yield put({ type: USER_UPDATE_SUCCESS, payload: datas });
  } catch (error) {
    yield put({ type: USER_UPDATE_FAILED, payload: error });
  }
}

function* show({ payload }) {
  try {
    const request = {
      params: {}
    };
    const url = `users/${payload}`;
    const datas = yield call(get, url, request);
    yield put({ type: USER_GET_SUCCESS, payload: datas });
  } catch (error) {
    yield put({ type: USER_GET_FAILED, payload: error });
  }
}

export const userSagas = [
  takeLatest(USER_LIST_REQUEST, index),
  takeEvery(USER_CREATE_REQUEST, store),
  takeEvery(USER_UPDATE_REQUEST, update),
  takeLatest(USER_GET_REQUEST, show)
];
