import { ADD_TO_FAVORITE, SET_FAVORITES } from "../actions/favorite";
import FavoriteItem from "../../models/favorite-item";

const initialState = {
  favoriteCourses: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      const addedCourse = action.course;
      const favoriteImage = addedCourse.imageUrl;
      const favoriteTitle = addedCourse.title;
      const favoriteDescription = addedCourse.description;
      const favoriteRating = addedCourse.raing;
      const favoriteDedlines = [];

      let updatedOrNewFavoriteItem;

      if (state.favoriteCourses[addedCourse.id]) {
        // already have the item
      } else {
        updatedOrNewFavoriteItem = new FavoriteItem();
      }
      return {
        ...state,
        favoriteCourses: {
          ...state.favoriteCourses,
          [addedCourse.id]: updatedOrNewCartItem,
        },
      };
    case SET_FAVORITES:
      return {
        favoriteCourses: action.favorites,
      };
  }
  return state;
};
