import { FETCH_MY_DEADLINES, UPLOAD_DEADLINE } from "../actions/deadlines";

const initialState = {
  deadlines: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_DEADLINES:
      return {
        ...state,
        deadlines: action.deadlines,
      };
    case UPLOAD_DEADLINE:
      return {
        ...state,
      };
  }
  return state;
};
