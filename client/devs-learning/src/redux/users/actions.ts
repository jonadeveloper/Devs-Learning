import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";
import { RootState } from "../store";
import { reducer } from "./slice";
const { REACT_APP_BASE_URL, REACT_APP_FIREBASE_CONFIG } = process.env;
const provider = new GoogleAuthProvider();

const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const registerUser = (
  data: CreateUserInterface
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/register`, data);
      if (response !== null) {
        dispatch(reducer.signUp(response.data));
        Swal.fire("Create user successfully!", "", "success");
      }
    } catch (error) {
      Swal.fire(`Error: ${error}, try again`, "", "error");
    }
  };
};

export var userData: any;

export const loginUser = (
  data: any,
  setAuth: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/login`, data);
      if (response.data !== null) {
        userData = response.data;
        setAuth = "logged";
        dispatch(reducer.signIn(setAuth));
        Swal.fire("Logged in", "", "success");
      }
    } catch (error) {
      Swal.fire(`Error: ${error}, try again`, "", "error");
    }
  };
};

export const signInWithGoogle = (
  setAuth: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      let response = await signInWithPopup(auth, provider);
      if (response !== null) {
        setAuth = "logged";
        dispatch(reducer.signIn(setAuth));
        Swal.fire("Logged in", "", "success");
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(`${errorCode}: ${errorMessage}, try again`, "", "error");
    }
  };
};

export const userInfo = localStorage.getItem("loggedUserInfo");
export var userInfoObj: any;

export const getUser = (
  setAuth: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    if (userInfo!.length > 9) {
      setAuth = "logged";
      userInfoObj = JSON.parse(userInfo!);
      dispatch(reducer.getUser(setAuth));
    } else {
      setAuth = "notLogged";
      dispatch(reducer.getUser(setAuth));
    }
  };
};

export const recoverPassword = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/recover`, data);
      dispatch(reducer.recover(response.data));
      Swal.fire("Log out", "", "success");
    } catch (error) {
      Swal.fire(`${error}, try again`, "", "error");
    }
  };
};

export const signOutAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      if (auth.currentUser?.providerId === "firebase") {
        let result = await signOut(auth);
        dispatch(reducer.logOut(result));
      } else {
        userData = null;
        dispatch(reducer.logOut(userData));
      }

      Swal.fire("Log out", "", "success");
    } catch (error) {
      Swal.fire(`${error}, try again`, "", "error");
    }
  };
};
