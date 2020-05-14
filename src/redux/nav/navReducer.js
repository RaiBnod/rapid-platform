import { SET_ACTIVE_NAV } from './navTypes';

const initialState = { active: {} };

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_NAV:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
};

export default navReducer;
