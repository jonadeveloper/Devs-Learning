import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { reducer, allUsers } from "./slice";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";

export const { REACT_APP_BASE_URL, REACT_APP_FIREBASE_CONFIG } = process.env;

export const getUsersInfo = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`${REACT_APP_BASE_URL}/usersInfo`).then((response) => {
      dispatch(reducer.setAllUsers(response.data));
    });
  };
};

export const BanUser = (
  user: any,
  siono: boolean
): ThunkAction<void, RootState, unknown, AnyAction> => {
  user.siono = siono;
  return (dispatch) => {
    if (siono) {
      axios
        .put(`${REACT_APP_BASE_URL}/ban?id=${user[0].id}`)
        .then((response) => {
          dispatch(reducer.BanUsers(user));
        });
    } else {
      axios
        .put(`${REACT_APP_BASE_URL}/pardon?id=${user[0].id}`)
        .then((response) => {
          dispatch(reducer.BanUsers(user));
        });
    }
  };
};

export const EditUser = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    axios.put(`${REACT_APP_BASE_URL}/updateUserRol`, data).then((response) => {
      dispatch(reducer.UpdateAllUsers(data));
    });
  };
};
