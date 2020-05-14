import { SET_ACTIVE_NAV } from './navTypes';

export const setActiveNav = (payload) => {
  return {
    type: SET_ACTIVE_NAV,
    payload,
  };
};
