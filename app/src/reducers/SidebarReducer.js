import { TOGGLE_SIDEBAR } from '../actions/types';

const INITIAL_STATE = {
  isOpen: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { isOpen: action.payload };
    default:
      return state;
  }
};
