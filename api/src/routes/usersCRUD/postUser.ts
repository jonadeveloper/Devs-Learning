require("dotenv").config();
import { Request, Response } from "express";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

const { FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const { Users } = require("../../db");

export async function signUp(req: Request, res: Response) {
  try {
    const { fullname, email, password } = req.body;
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      Users.create({
        id: user.uid,
        fullname: fullname,
        email: user.email,
        lastLogin: user.metadata.creationTime,
      });
    }

    await updateProfile(user, { displayName: fullname }).catch((err) =>
      console.log(err)
    );
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
