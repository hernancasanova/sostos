import {
  USER_LIST_REQUEST,
  USER_NAME_CHANGED,
  USER_CREATE_REQUEST,
  USER_UPDATE_REQUEST,
  USER_GET_REQUEST,
  USER_RESET,
  USER_LASTNAME_CHANGED,
  USER_EMAIL_CHANGED,
  USER_ROLE_CHANGED,
  USER_PASSWORD_CHANGED,
  USER_CONFIRMED_PASSWORD_CHANGED,
  USER_AVATAR_CHANGED
} from './types';

export const userListRequest = () => ({
  type: USER_LIST_REQUEST,
  payload: {}
});

export const userNameChanged = data => ({
  type: USER_NAME_CHANGED,
  payload: data
});

export const userLastNameChanged = data => ({
  type: USER_LASTNAME_CHANGED,
  payload: data
});

export const userEmailChanged = data => ({
  type: USER_EMAIL_CHANGED,
  payload: data
});

export const userRoleChanged = data => ({
  type: USER_ROLE_CHANGED,
  payload: data
});

export const userPasswordChanged = data => ({
  type: USER_PASSWORD_CHANGED,
  payload: data
});

export const userConfirmedPasswordChanged = data => ({
  type: USER_CONFIRMED_PASSWORD_CHANGED,
  payload: data
});

export const userAvatarChanged = data => ({
  type: USER_AVATAR_CHANGED,
  payload: data
});

export const userCreate = data => ({
  type: USER_CREATE_REQUEST,
  payload: data
});

export const userUpdate = data => ({
  type: USER_UPDATE_REQUEST,
  payload: data
});

export const userGet = data => ({
  type: USER_GET_REQUEST,
  payload: data
});

export const userReset = () => ({
  type: USER_RESET,
  payload: ''
});
