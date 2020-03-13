import {
  AUTH_SIGNUP_EMAIL_CHANGED,
  AUTH_SIGNUP_NAME_CHANGED,
  AUTH_SIGNUP_LAST_NAME_CHANGED,
  AUTH_SIGNUP_PASSWORD_CHANGED,
  AUTH_SIGNUP_CONFIRMED_PASSWORD_CHANGED,
  AUTH_SIGNUP_BIRTH_DATE_CHANGED,
  AUTH_SIGNUP_BULLETIN_CHANGED,
  AUTH_SIGNUP_REQUEST_SUCCESS,
  AUTH_SIGNUP_REQUEST_FAILED,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_RESET
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  name: '',
  lastName: '',
  password: '',
  confirmedPassword: '',
  birthDate: '',
  bulletin: false,
  errors: [],
  data: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGNUP_RESET:
      return { ...state, ...INITIAL_STATE };
    case AUTH_SIGNUP_EMAIL_CHANGED:
      return { ...state, email: action.payload, errors: [] };
    case AUTH_SIGNUP_NAME_CHANGED:
      return { ...state, name: action.payload, errors: [] };
    case AUTH_SIGNUP_LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload, errors: [] };
    case AUTH_SIGNUP_PASSWORD_CHANGED:
      return { ...state, password: action.payload, errors: [] };
    case AUTH_SIGNUP_CONFIRMED_PASSWORD_CHANGED:
      return { ...state, confirmedPassword: action.payload, errors: [] };
    case AUTH_SIGNUP_BIRTH_DATE_CHANGED:
      return { ...state, birthDate: action.payload, errors: [] };
    case AUTH_SIGNUP_BULLETIN_CHANGED:
      return { ...state, bulletin: action.payload, errors: [] };
    case AUTH_SIGNUP_REQUEST:
      return { ...state, loading: true, errors: [] };
    case AUTH_SIGNUP_REQUEST_FAILED:
      const { code, message } = action.payload;
      return {
        ...state,
        loading: false,
        errors: {
          code,
          message
        }
      };
    case AUTH_SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
