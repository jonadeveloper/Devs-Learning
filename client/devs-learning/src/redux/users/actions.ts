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
const { REACT_APP_BASE_URL } = process.env;
const provider = new GoogleAuthProvider();

var firebaseConfig = {
  apiKey: "AIzaSyC2NdZp4--hGRr-W9sEHkrK8yVCo1OKN70",
  authDomain: "devslearning-76766.firebaseapp.com",
  projectId: "devslearning-76766",
  storageBucket: "devslearning-76766.appspot.com",
  messagingSenderId: "508465796522",
  appId: "1:508465796522:web:9c6070d8abb6a4680a47d3",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const registerUser = (
  data: CreateUserInterface
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(reducer.setLoading());
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/register`, data);
      dispatch(reducer.signUp(response.data));

      Swal.fire("Create user successfully!", "", "success");
    } catch (error) {
      Swal.fire(`Error: ${error}, try again`, "", "error");
    }
  };
};

export const loginUser = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(reducer.setLoading());
    try {
      let response = await axios.post(`${REACT_APP_BASE_URL}/login`, data);
      dispatch(reducer.signIn(response.data));
      Swal.fire("Logged in", "", "success");
    } catch (error) {
      Swal.fire(`Error: ${error}, try again`, "", "error");
    }
  };
};

export const signInWithGoogle = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
<<<<<<< HEAD
=======

>>>>>>> 5077eb14f4e2131966a1204bac9d1d7bab0582e2
    try {
      let response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential?.accessToken;
      const user = response.user;
      dispatch(reducer.signIn(user));
      Swal.fire("Logged in", "", "success");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      Swal.fire(`${errorCode}: ${errorMessage}, try again`, "", "error");
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
      Swal.fire("Log out", "", "success");
    } catch (error) {
      Swal.fire(`${error}, try again`, "", "error");
    }
  };
};


