import { all } from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { userSagas } from './userSagas';
import { profileSagas } from './profileSagas';

export default function* rootSaga() {
  yield all([...authSagas, ...userSagas, ...profileSagas]);
}
