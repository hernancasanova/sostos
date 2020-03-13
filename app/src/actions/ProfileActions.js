import { PROFILE_UPDATE } from '../actiontypes/profile';

export const profileUpdate = user => ({
  type: PROFILE_UPDATE,
  user
});
