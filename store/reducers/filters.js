import { SET_FILTERS, CLEAR_FILTERS } from "../actions/filters";

const initialState = {
  filters: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case CLEAR_FILTERS:
      return initialState;
  }
  return state;
};
