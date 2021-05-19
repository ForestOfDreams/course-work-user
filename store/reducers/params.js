import { SET_PARAMS } from "../actions/params";

const initialState = {
  params: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARAMS:
      return {
        ...state,
        params: action.params,
      };
  }
  return state;
};
