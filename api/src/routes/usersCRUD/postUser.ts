require("dotenv").config();
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Request, Response } from "express";
const { Users } = require("../../db");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

var firebaseConfig = {
  apiKey: "AIzaSyC2NdZp4--hGRr-W9sEHkrK8yVCo1OKN70",
  authDomain: "devslearning-76766.firebaseapp.com",
  projectId: "devslearning-76766",
  storageBucket: "devslearning-76766.appspot.com",
  messagingSenderId: "508465796522",
  appId: "1:508465796522:web:9c6070d8abb6a4680a47d3",
  databaseURL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).send(user);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(404).send(`Error: ${errorCode}, ${errorMessage}`);
  }
}

export async function signUp(req: Request, res: Response) {
  try {
    const { fullname, email, password } = req.body;

    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    Users.create({
      id: user.uid,
      fullname: fullname,
      email: user.email,
      lastLogin: Date.now(),
    });
    res.status(201).send(user);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(404).send(`${errorCode}, ${errorMessage}`);
  }
}
