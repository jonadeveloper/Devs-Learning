import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { CoursoBack } from "../../components/Cards/Card";
import { createCourse } from "../../interfaces/Course";
import { RootState } from "../store";
import { reducer } from "./slice";
const { REACT_APP_PROD_URL, REACT_APP_BASE_URL } = process.env;
const BACK = REACT_APP_BASE_URL || REACT_APP_PROD_URL;

export const getCourses = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`${BACK}/courses`).then((response) => {
      response.data.map((course: any) => {
        course.name = course.name.replaceAll("-", " ");
        course.name = course.name[0].toUpperCase() + course.name.substring(1);
        course.categories.map((category: any) => {
          category.name = category.name.replaceAll("-", " ");
          category.name =
            category.name[0].toUpperCase() + category.name.substring(1);
        });
      });
      dispatch(reducer.allCourses(response.data));
    });
  };
};
export const getCoursesByName = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(reducer.setLoading());
    axios.get(`${BACK}/courses?id=${id}`).then((response) => {
      response.data.map((course: any) => {
        course.name = course.name.replaceAll("-", " ");
        course.name = course.name[0].toUpperCase() + course.name.substring(1);
        course.categories.map((category: any) => {
          category.name = category.name.replaceAll("-", " ");
          category.name =
            category.name[0].toUpperCase() + category.name.substring(1);
        });
      });
      dispatch(reducer.currentCourse(response.data[0]));
    });
  };
};
export const getCategories = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`${BACK}/categories`).then((response) => {
      response.data.map((category: any) => {
        category.name = category.name.replaceAll("-", " ");
        category.name =
          category.name[0].toUpperCase() + category.name.substring(1);
      });
      dispatch(reducer.allCategories(response.data));
    });
  };
};

export const searchCourses = (
  courses: Array<CoursoBack>,
  search: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    try {
      let allcourses = [...courses];

      if (search !== "") {
        search = search.toLowerCase();

        allcourses = allcourses.filter((course) => {
          if (course.name.toLowerCase().includes(search)) return true;
        });

        if (allcourses.length < 1) search = "";
      }

      if (allcourses.length < 1) {
        Swal.fire({
          title: "Search not found",
          text: "try another search",
        });
        search = "not Found";
      }

      dispatch(reducer.searched({ allcourses, search }));
    } catch (error) {
      dispatch(reducer.searched(error));
    }
  };
};

export const setCurrentCourse = (
  card: CoursoBack
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    return dispatch(reducer.currentCourse(card));
  };
};

export const createCourseAction = (
  course: createCourse
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(reducer.setLoading());
    axios
      .post(BACK + "/courses/", course)
      .then((response) => {
        dispatch(reducer.createCourse());
        Swal.fire("Course created successfully!", "", "success");
      })
      .catch((err) => {
        dispatch(reducer.createCourse());
        Swal.fire("Something went wrong, please try again", "", "error");
      });
  };
};
export const editCourseAction = (
  course: createCourse,
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(reducer.setLoading());
    axios
      .put(BACK + "/courses", course)
      .then((response) => {
        dispatch(reducer.createCourse());
        Swal.fire("Course edited successfully!", "", "success").then(() => {
          window.location.href = `/courseDetail/${id}`;
        });
      })
      .catch((err) => {
        dispatch(reducer.createCourse());
        Swal.fire("Something went wrong, please try again", "", "error");
      });
  };
};

export const setFiltered = (
  order: string,
  courses: Array<CoursoBack>,
  coursesFiltered: Array<CoursoBack>,
  searched: string,
  category: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    let filteredCourses: Array<CoursoBack> = [];

    if (searched === "") {
      filteredCourses = [...courses];
    } else {
      filteredCourses = [...coursesFiltered];
    }

    //categories

    if (category !== "") {
      filteredCourses = filteredCourses.filter((course) => {
        if (
          course.categories[0].name === category ||
          course.categories[1].name === category
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    ///////////////////////////

    //order
    if (order === "A-Z") {
      filteredCourses.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (order === "Z-A") {
      filteredCourses
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        .reverse();
    }

    if (order === "- Price") {
      filteredCourses.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price);
      });
    }

    if (order === "+ Price") {
      filteredCourses.sort((a, b) => {
        return parseInt(b.price) - parseInt(a.price);
      });
    }

    if (order === "- Duration") {
      filteredCourses.sort((a, b) => {
        return parseInt(a.duration) - parseInt(b.duration);
      });
    }

    if (order === "+ Duration") {
      filteredCourses.sort((a, b) => {
        return parseInt(b.duration) - parseInt(a.duration);
      });
    }

    ///////////////////////////

    //alert

    if (filteredCourses.length < 1 && category !== "") {
      Swal.fire({
        title: "Search not found",
        text: "try another search",
      });
      let search = "not Found";
      let allcourses = filteredCourses;
      dispatch(reducer.searched({ allcourses, search }));
    }

    /////////////////////////////////

    return dispatch(reducer.setFiltered(filteredCourses));
  };
};

export const addToCart = (
  card: CoursoBack
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    return dispatch(reducer.addToCart(card));
  };
};

export const removeToCart = (
  card: CoursoBack
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    return dispatch(reducer.removeToCart(card));
  };
};

export const clearSearch = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    return dispatch(reducer.clearSearched());
  };
};

export const clearCart = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    return dispatch(reducer.clearCart());
  };
};

//// RATING
export const AddRating = (
  rating: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    axios
      .put(BACK + "/courses/putRating", rating)
      .then((response) => {
        dispatch(
          reducer.addRating({
            rating: rating.rating.rating,
            comment: rating.rating.comment,
            user: rating.rating.user,
            course: rating.nameCourse,
          })
        );
      })
      .catch((err) => {
        Swal.fire("Something went wrong, please try again", "", err);
      });
  };
};

export const clearBoughtCart = (
  localCart: any,
  usercart: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    let newCart = [...localCart];

    newCart = newCart.filter((item: any) => {
      return !usercart.some((course: any) => course.name === item.name);
    });

    return dispatch(reducer.filterBoughtCart(newCart));
  };
};

export const DeletedCourse = (
  course: any,
  siono: boolean
): ThunkAction<void, RootState, unknown, AnyAction> => {
  course.siono = siono;
  return (dispatch) => {
    if (siono) {
      axios
        .put(`${REACT_APP_BASE_URL}/courses/logicDelete?id=${course[0].id}`)
        .then((response) => {
          dispatch(reducer.DeletedCourses(course));
        });
    } else {
      axios
        .put(`${REACT_APP_BASE_URL}/courses/logicRestore?id=${course[0].id}`)
        .then((response) => {
          dispatch(reducer.DeletedCourses(course));
        });
    }
  };
};
