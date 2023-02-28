import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";


import { RootState } from "../store";
import { reducer, allUsers } from './slice';
import { CreateUserInterface } from '../../interfaces/CreateUserInterface';


export const { REACT_APP_BASE_URL, REACT_APP_FIREBASE_CONFIG } = process.env;





export const getUsersInfo = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    axios.get(`http://localhost:3001/usersInfo`).then((response) => {

      dispatch(reducer.setAllUsers(response.data));
      console.log("🚀 ~ file: actions.ts:26 ~ axios.get ~ response:", response.data)
    });
  };
};

export const BanUser = (
  user: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {

    axios
      .put(`${REACT_APP_BASE_URL}/ban?id=${user[0].id}`)
      .then((response) => {
        console.log("🚀 ~ file: actions.ts:44 ~ return ~ user:", user)
         dispatch(reducer.BanUsers(user));

      })

  };

};

export const DesBanUser = (
  user: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {

    axios
      .put(`${REACT_APP_BASE_URL}/pardon?id=${user[0].id}`)
      .then((response) => {
        console.log("🚀 ~ file: actions.ts:56 ~ return ~ user:", user)
        dispatch(reducer.DesBanUsers(user));

      })

  };

};

export const EditUser = (
  data: any
  
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {

    axios
      .put(`${REACT_APP_BASE_URL}/updateUserRol`, data)
      .then((response) => {
        console.log("🚀 ~ file: actions.ts:44 ~ return ~ user:", data)
         dispatch(reducer.UpdateAllUsers(data));

      })

  };

};







