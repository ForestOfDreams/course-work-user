import { LogBox } from "react-native";

export const FETCH_MY_DEADLINES = "FETCH_MY_DEADLINES";
export const UPLOAD_DEADLINE = "UPLOAD_DEADLINE";

export const fetchMyDeadlines = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/api/deadlines`,
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

    dispatch({ type: FETCH_MY_DEADLINES, deadlines: resData });
  };
};

export const uploadDeadline = (
  description,
  isCompleted,
  start,
  finish,
  internship_id
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/api/deadlines?internship=${internship_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },

        body: JSON.stringify({
          description: description,
          isCompleted: isCompleted,
          start: start,
          finish: finish,
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

export const deleteDeadline = (deadline_id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://internships-hse.herokuapp.com/api/deadlines/${deadline_id}`,
      {
        method: "DELETE",
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
  };
};

export const updateDeadline = (
  description,
  isCompleted,
  start,
  finish,
  deadline_id
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/api/deadlines?internship=${deadline_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          description: description,
          isCompleted: isCompleted,
          start: start,
          finish: finish,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const resData = await response.json();
  };
};
