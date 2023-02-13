import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { reducer } from "./slice";
const { REACT_APP_BASE_URL } = process.env;
export const registerUser = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/register`, data);
      dispatch(reducer.signUp(response.data));
    } catch (error) {
      alert(error);
    }
  };
};

export const loginUser = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/login`, data);
      dispatch(reducer.signIn(response.data));
    } catch (error) {
      alert(error);
    }
  };
};
