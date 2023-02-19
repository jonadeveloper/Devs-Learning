require("dotenv").config();
import { Request, Response } from "express";
/*import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);*/

const { Users } = require("../../db");

/*export async function signIn(req: Request, res: Response) {
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
}*/

export async function signUp(req: Request, res: Response) {
  try {
    const { id, fullname, email, lastSignInTime } = req.body;
    /*let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { ...user, displayName: fullname }).catch((err) =>
      console.log(err)
    );*/
    const fullnameDB = fullname.split(" ").join("-").toLowerCase();
    if (id) {
      await Users.create({
        id: id,
        fullname: fullnameDB,
        email: email,
        lastLogin: lastSignInTime,
      });
    }
    res.status(201).send(`The user ${fullname} has been created`);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(404).send(`${errorCode}, ${errorMessage}`);
  }
}

/*export async function recoverPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    await sendPasswordResetEmail(auth, email);
    res.status(200).send("Check your email, remember check spam folder");
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(404).send(`${errorCode}, ${errorMessage}`);
  }
}*/
