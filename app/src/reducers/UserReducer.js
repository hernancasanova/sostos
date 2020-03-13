import {
  USER_LIST_REQUEST,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  USER_NAME_CHANGED,
  USER_CREATE_REQUEST,
  USER_CREATE_FAILED,
  USER_CREATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
  USER_GET_REQUEST,
  USER_GET_FAILED,
  USER_GET_SUCCESS,
  USER_RESET,
  USER_LASTNAME_CHANGED,
  USER_EMAIL_CHANGED,
  USER_ROLE_CHANGED,
  USER_PASSWORD_CHANGED,
  USER_CONFIRMED_PASSWORD_CHANGED,
  USER_AVATAR_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  user: null,
  loading: false,
  errors: [],
  name: '',
  lastname: '',
  email: '',
  role_id: 1,
  password: '',
  avatar: '',
  confirmedPassword: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_NAME_CHANGED:
      return { ...state, name: action.payload, errors: [] };
    case USER_LASTNAME_CHANGED:
      return { ...state, lastname: action.payload, errors: [] };
    case USER_EMAIL_CHANGED:
      return { ...state, email: action.payload, errors: [] };
    case USER_ROLE_CHANGED:
      return { ...state, role_id: action.payload, errors: [] };
    case USER_PASSWORD_CHANGED:
      return { ...state, password: action.payload, errors: [] };
    case USER_CONFIRMED_PASSWORD_CHANGED:
      return { ...state, confirmedPassword: action.payload, errors: [] };
    case USER_AVATAR_CHANGED:
      return { ...state, avatar: action.payload, errors: [] };
    case USER_LIST_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case USER_LIST_FAILED:
      var { code, message } = action.payload;
      var errors = {
        code: code,
        message: message
      };
      return {
        ...state,
        errors,
        loading: false
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        users: global._.mapKeys(action.payload.data.data, 'id'),
        loading: false
      };
    case USER_CREATE_REQUEST:
      return { ...state, users: [], errors: [], loading: true };
    case USER_CREATE_FAILED:
      return {
        ...state,
        errors: action.payload.data.data.errors,
        loading: false
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case USER_UPDATE_REQUEST:
      return { ...state, errors: [], loading: true };
    case USER_UPDATE_FAILED:
      return {
        ...state,
        errors: action.payload.data.data.errors,
        loading: false
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.data.data,
        loading: false
      };
    case USER_GET_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case USER_GET_FAILED:
      return {
        ...state,
        errors: action.payload.data.data.errors,
        loading: false
      };
    case USER_GET_SUCCESS:
      return {
        ...state,
        user: action.payload.data.data,
        name: action.payload.data.data.name,
        lastname: action.payload.data.data.lastname,
        email: action.payload.data.data.email,
        role_id: action.payload.data.data.role_id,
        avatar: action.payload.data.data.avatar,
        loading: false
      };
    case USER_RESET:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
