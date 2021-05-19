import { FETCH_MY_REVIEWS, UPLOAD_REVIEW } from "../actions/reviews";

const initialState = {
  reviews: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case UPLOAD_REVIEW:
      return {
        ...state,
      };
  }
  return state;
};
