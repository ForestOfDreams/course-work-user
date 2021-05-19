import Course from "../../models/course";

export const SET_COURSES = "SET_COURSES";

export const fetchCourses = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const params = getState().filters;
      var url =
        "https://internships-hse.herokuapp.com/internships/filter?search=";
      if (params.filters.country) {
        url = url.concat("country:", params.filters.country, ",");
      }
      if (params.filters.subject) {
        url = url.concat("subject:", params.filters.subject, ",");
      }
      if (params.filters.price) {
        url = url.concat("price:", params.filters.price, ",");
      }
      if (params.filters.language) {
        url = url.concat("language:", params.filters.language, ",");
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadCourses = [];

      for (const key in resData) {
        loadCourses.push(
          new Course(
            resData[key].checked,
            resData[key].country,
            resData[key].description,
            resData[key].finishDate,
            resData[key].internship_id,
            resData[key].language,
            resData[key].name,
            resData[key].price,
            resData[key].reviews,
            resData[key].startDate,
            "https://media.makeameme.org/created/aim-for-horizontal-59d2d1.jpg",
            9.8,
            resData[key].subject
          )
        );

        // new Course(
        //   resData[key].checked,
        //   "Россия",
        //   "Кайф",
        //   new Date(),
        //   resData[key].internship_id,
        //   "Русский",
        //   "Вышка",
        //   440000,
        //   resData[key].reviews,
        //   new Date(),
        //   "https://www.hse.ru/data/2019/08/23/1536734213/20190823_2697-Pano-2.jpg",
        //   9.8,
        //   "Прога"
        // )
      }
      dispatch({ type: SET_COURSES, courses: loadCourses });
    } catch (err) {
      throw err;
    }
  };
};
