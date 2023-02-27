import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { CoursoBack } from "../../components/Cards/Card";
import { createCourse } from "../../interfaces/Course";
import { RootState } from "../store";
import { reducer } from "./slice";
const { REACT_APP_PROD_URL, REACT_APP_BASE_URL } = process.env;
const BACK = REACT_APP_BASE_URL || REACT_APP_PROD_URL;

export const getSales = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`${BACK}/courses/sales`).then((response) => {
      // console.log(response.data);
      dispatch(reducer.allSales(response.data));
    });
  };
};
