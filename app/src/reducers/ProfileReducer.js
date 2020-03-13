import { PROFILE_UPDATE } from '../actiontypes/profile';

const INITIAL_STATE = {
  name: 'Hernan Casanova',
  rut: '18123697-2',
  email: 'hcasanova@allware.cl',
  password: '************'
};

export default (state = INITIAL_STATE, action) => {
  const { user } = action;
  switch (action.type) {
    case PROFILE_UPDATE:
      return Object.assign(state, user);
    default:
      return state;
  }
};
