import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { reducer } from "./slice"

export const getCourses = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch) => {
        axios.get("http://181.127.189.247:3001/courses")
            .then((response) => {
                console.log(response.data);
                dispatch(reducer.allCourses(response.data))
            })
    }
}
