import { MODAL_LOGIN_IS_OPEN, MODAL_SIGN_UP_IS_OPEN } from '../actions/types';

const INITIAL_STATE = {
  isLoginModalOpen: false,
  isSignUpModalOpen: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_LOGIN_IS_OPEN:
      return { ...state, isLoginModalOpen: !state.isLoginModalOpen };
    case MODAL_SIGN_UP_IS_OPEN:
      return { ...state, isSignUpModalOpen: !state.isSignUpModalOpen };
    default:
      return state;
  }
};
