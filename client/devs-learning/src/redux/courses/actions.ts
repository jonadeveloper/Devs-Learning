import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CoursoBack } from "../../components/Cards/Card";
import { RootState } from "../store";
import { reducer } from "./slice"

const BACK = "http://181.127.189.247:3001";

export const getCourses = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get("http://181.127.189.247:3001/courses").then((response) => {
      console.log(response.data);
      dispatch(reducer.allCourses(response.data));
    });
  };
};

export const setCurrentCourse = (card: CoursoBack): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch) => {
        console.log(card)
       return dispatch(reducer.currentCourse(card))
    }
}

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
        }
  
        dispatch(reducer.searched(allcourses));
      } catch (error) {
        console.log("no se encontro el curso buscado, se muestran todos");
  
        dispatch(reducer.searched(error));
      }
    };
  };