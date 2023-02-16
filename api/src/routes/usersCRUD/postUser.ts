require("dotenv").config();
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { Request, Response } from "express";

const { Users } = require("../../db");
const { FIREBASE_CONFIG } = process.env;

const firebaseConfig = JSON.parse(FIREBASE_CONFIG!);
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

    // const user = userCredential.user;
    res.status(200).send(userCredential);
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

export async function recoverPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    await sendPasswordResetEmail(auth, email);
    res.status(200).send("Check your email, remember check spam folder");
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(404).send(`${errorCode}, ${errorMessage}`);
  }
}
