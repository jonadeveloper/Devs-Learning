import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import { CreateUserInterface } from "../../interfaces/CreateUserInterface";
import { RootState } from "../store";
import { reducer } from "./slice";
import {
  userEmail,
  userFullname,
  userLastLogin,
  userPhoneNumber,
} from "../../router/index";

export const { REACT_APP_BASE_URL, REACT_APP_FIREBASE_CONFIG } = process.env;
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
        const redirect = (url: any, asLink = true) =>
          asLink ? (window.location.href = url) : window.location.replace(url);
        dispatch(reducer.signUp(response.data));
        Swal.fire("Create user successfully! Please Login", "", "success");
        redirect(`/auth/signin`);
      }
    } catch (error) {
      Swal.fire(`Error: ${error}, try again`, "", "error");
    }
  };
};

export const loginUser = (
  data: any,
  setAuth: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const { email, password } = data;
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential !== null) {
        const banned = await axios.get(
          `${REACT_APP_BASE_URL}/banned?email=${email}`
        );
        if (!banned.data) {
          Swal.hideLoading();
          setAuth = "logged";
          dispatch(reducer.signIn(setAuth));
          Swal.fire("Logged in", "", "success");
        } else {
          Swal.fire(
            `Error: You are banned, for more information contact support`,
            "",
            "error"
          );
        }
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
      let userCredential = await signInWithPopup(auth, provider);
      Swal.showLoading();
      if (userCredential !== null) {
        axios.post(`${REACT_APP_BASE_URL}/fake`, userCredential.user);
        axios
          .get(
            `${REACT_APP_BASE_URL}/banned?email=${userCredential.user.email}`
          )
          .then((response) => {
            if (!response.data) {
              Swal.hideLoading();
              setAuth = "logged";
              dispatch(reducer.signIn(setAuth));
              Swal.fire("Logged in", "", "success");
            } else {
              Swal.fire(
                `Error: You are banned, for more information contact support`,
                "",
                "error"
              );
            }
          });
      }
    } catch (error: any) {
      Swal.hideLoading();
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
    if (userInfo && userInfo!.length > 9) {
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
      let result = await signOut(auth);
      dispatch(reducer.logOut(result));
      userInfoObj = undefined;
      Swal.fire("Log out", "", "success");
    } catch (error) {
      Swal.fire(`${error}, try again`, "", "error");
    }
  };
};

export const setFullName = (
  name: any,
  email: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    return dispatch(reducer.setFullName({ name, email }));
  };
};

export const getBoughtCoursesNames = (
  userEmail: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const users = await axios
      .get(`${REACT_APP_BASE_URL}/usersInfo`)
      .then((response) => response.data);

    const user = users.filter((us: any) => {
      return us.email === userEmail.toString();
    });

    return dispatch(reducer.setBoughtCourses(user[0].courses));
  };
};
