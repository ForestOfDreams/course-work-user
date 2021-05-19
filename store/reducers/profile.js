import { FETCH_USER, UPDATE_USER } from "../actions/profile";

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.userData,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.userData,
      };
  }
  return state;
};
