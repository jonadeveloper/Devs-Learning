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



export const getUsersInfo = (userEmail: any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const users = await axios.get(`${REACT_APP_BASE_URL}/usersInfo`).then((response) => response.data);
    console.log('usuarios:')
    console.log(users)
    return dispatch(reducer.setAllUsers(users))
  }
}






