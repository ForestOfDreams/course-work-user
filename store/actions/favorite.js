export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE";
export const SET_FAVORITES = "SET_FAVORITES";

export const addToFavorite = (internship_name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const username = getState().auth.username;
    const response = await fetch(
      `https://internships-hse.herokuapp.com/internships/favourites?username=${username}&internship_name=${internship_name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    // const resData = await response.json();
  };
};

export const removeFromFavorite = (internship_name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const username = getState().auth.username;
    const response = await fetch(
      `https://internships-hse.herokuapp.com/internships/favourites?username=${username}&internship_name=${internship_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
};

export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const username = getState().auth.username;

    const response = await fetch(
      `https://internships-hse.herokuapp.com/api/students/favourites?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({ type: SET_FAVORITES, favorites: resData });
  };
};
