import COURSES from "../../data/dummy-data";
import Course from "../../models/course";
import { SET_COURSES } from "../actions/courses";

const initialState = {
  availableCourses: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        availableCourses: action.courses,
      };
  }
  return state;
};
