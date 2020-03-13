/* eslint-disable no-undef */
import {
  AUTH_EMAIL_CHANGED,
  AUTH_PASSWORD_CHANGED,
  AUTH_SIGNIN,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS,
  AUTH_GET_ME,
  AUTH_GET_ME_SUCCESS,
  AUTH_GET_ME_FAILED,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED,
  MODAL_LOGIN_IS_OPEN,
  MODAL_SIGN_UP_IS_OPEN
} from '../actions/types';

const MODO_OFFLINE = true;

const INITIAL_STATE = {
  email: '',
  password: '',
  errors: false,
  data: null,
  loading: false,
  token: MODO_OFFLINE ? 'token-falso' : localStorage.getItem('token'),
  tokenRefresh: localStorage.getItem('token.refreshToken'),
  tokenType: localStorage.getItem('token.tokenType'),
  expiresIn: localStorage.getItem('token.expiresIn') ? localStorage.getItem('token.expiresIn') : 0,
  user: MODO_OFFLINE
    ? {
        id: 1,
        name: 'Offline',
        email: 'modo@offline.com',
        verified: 1,
        admin: 0,
        avatar: 'default.png',
        role_id: 1,
        created_at: '2019-10-15 18:30:19',
        updated_at: '2019-10-15 18:30:19'
      }
    : null,
  isLoginModalOpen: false,
  isRegisterModalOpen: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_EMAIL_CHANGED:
      return { ...state, email: action.payload, errors: false };
    case AUTH_PASSWORD_CHANGED:
      return { ...state, password: action.payload, errors: false };
    case AUTH_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        errors:
          typeof action.payload !== 'undefined'
            ? action.payload
            : { error: 'Servidor en mantención temporalmente' },
        password: ''
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        // ...INITIAL_STATE,
        data: action.payload,
        user: action.payload.user,
        token: action.payload.access_token,
        loading: false,
        // tokenRefresh: action.payload.token.refreshToken,
        // tokenType: action.payload.token.tokenType,
        // expiresIn: action.payload.token.expiresIn,
        isLoginModalOpen: false // ← Revisar como quedó acá
      };

    case AUTH_SIGNIN:
      return { ...state, loading: true, errors: false };

    case AUTH_GET_ME:
      return {
        ...state,
        user: null,
        loading: true,
        errors: false
      };
    case AUTH_GET_ME_SUCCESS:
      // localStorage.setItem('livingover.lang', action.payload.data.user.lang);
      return {
        ...state,
        user: action.payload.data,
        loading: false
      };
    case AUTH_GET_ME_FAILED:
      // TODO: Revisar el estado de errors, tiene que venir del servidor
      return {
        ...state,
        loading: false,
        errors: ['Authenticated failed'],
        password: ''
      };
    case AUTH_LOGOUT:
      return { ...state, loading: true, errors: [] };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case AUTH_LOGOUT_FAILED:
      // TODO: Revisar el estado de errors, tiene que venir del servidor
      return { ...state, loading: false, errors: ['Logout failed'] };
    /* Auth modals */
    case MODAL_LOGIN_IS_OPEN:
      return { ...state, isLoginModalOpen: !state.isLoginModalOpen };
    case MODAL_SIGN_UP_IS_OPEN:
      return { ...state, isSignUpModalOpen: action.payload };
    default:
      return state;
  }
};
