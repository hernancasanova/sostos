// import { push } from 'react-router-redux';
import {
  call,
  put,
  takeLatest // , takeEvery
} from 'redux-saga/effects';
import {
  USER_PROFILE_SHOW_SUCCEEDED,
  USER_PROFILE_SHOW_REQUESTED,
  USER_PROFILE_SHOW_FAILED,
  USER_PROFILE_UPDATE_REQUESTED,
  USER_PROFILE_UPDATE_SUCCEEDED,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATEPHOTO_SUCCEEDED,
  USER_PROFILE_UPDATEPHOTO_FAILED,
  USER_PROFILE_UPDATEPHOTO_REQUESTED
} from '../actions/types';
import {
  post,
  get,
  put as putrequest // , del
} from '../services/api';
import { getErrors } from '../utils';

function* show({ payload }) {
  try {
    const request = {
      params: {}
    };
    const url = `users/${payload}`;
    const datas = yield call(get, url, request);
    yield put({ type: USER_PROFILE_SHOW_SUCCEEDED, payload: datas });
  } catch (error) {
    yield put({ type: USER_PROFILE_SHOW_FAILED, payload: error });
  }
}

function* update({ payload }) {
  try {
    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const request = payload;
    const url = `users/${payload.id}`;
    const datas = yield call(putrequest, url, request);
    yield put({ type: USER_PROFILE_UPDATE_SUCCEEDED, payload: datas });
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: USER_PROFILE_UPDATE_FAILED, payload: getErrors(errors) });
  }
}

function* updatePhoto({ payload }) {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const request = payload.form;
    const url = `users/${payload.id}/photo`;
    const datas = yield call(post, url, request, config);
    yield put({ type: USER_PROFILE_UPDATEPHOTO_SUCCEEDED, payload: datas });
  } catch (error) {
    console.debug(error);
    yield put({ type: USER_PROFILE_UPDATEPHOTO_FAILED, payload: error });
  }
}

export const profileSagas = [
  takeLatest(USER_PROFILE_SHOW_REQUESTED, show),
  takeLatest(USER_PROFILE_UPDATE_REQUESTED, update),
  takeLatest(USER_PROFILE_UPDATEPHOTO_REQUESTED, updatePhoto)
];
