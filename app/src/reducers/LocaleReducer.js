/* eslint-disable no-undef */
import { LOCALE_SET } from '../actions/types';

const INITIAL_STATE = {
  lang: localStorage.getItem('livingover.lang') ? localStorage.getItem('livingover.lang') : 'es'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCALE_SET:
      localStorage.setItem('livingover.lang', action.payload);
      return { lang: action.payload };
    default:
      return state;
  }
};
