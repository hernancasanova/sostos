import { TOGGLE_SIDEBAR } from './types';

const toggleSidebar = value => ({
  type: TOGGLE_SIDEBAR,
  payload: value
});

export { toggleSidebar };
