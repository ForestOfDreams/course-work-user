export const FETCH_MY_REVIEWS = "FETCH_MY_REVIEWS";
export const UPLOAD_REVIEW = "UPLOAD_REVIEW";

export const fetchMyReviews = () => {
  return async (dispatch, getState) => {
    const user = getState().profile.user;
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/reviews/user/${user.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: FETCH_MY_REVIEWS, reviews: resData });
  };
};

export const uploadReviews = (textcomment, score, internship_id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/reviews?internship_id=${internship_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          textcomment: textcomment,
          score: score,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }
  };
};

export const removeReviews = (review_id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://internships-hse.herokuapp.com/reviews/${review_id}`,
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
