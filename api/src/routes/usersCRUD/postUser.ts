require("dotenv").config();
import { Request, Response } from "express";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { sendMail } from "../../utils/sendMail";

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
    const fullnameDB = fullname.split(" ").join("-").toLowerCase();
    if (user) {
      Users.create({
        id: user.uid,
        fullname: fullnameDB,
        email: user.email,
        lastLogin: user.metadata.creationTime,
        banned: false,
      });
    }

    await updateProfile(user, { displayName: fullname }).catch((err) => {
      throw new Error(err);
    });

    sendMail({
      from: "simon__navarrete@hotmail.com",
      subject: "Registro Exitoso! Bienvenido a DevsLearning",
      text: "Bienvenido!",
      to: email,
      html: `<h1>Bienvenido a Devslearning, <strong>${fullname}</strong>!</h1>`,
    });

    res.status(201).send(user);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    res.status(404).send(`${errorCode}, ${errorMessage}`);
  }
}

export async function signUpDB(req: Request, res: Response) {
  try {
    const { id, fullname, email, rank } = req.body;
    const fullnameDB = fullname.split(" ").join("-").toLowerCase();
    await Users.create({
      id: id,
      fullname: fullnameDB,
      email: email,
      rank: rank,
    });
    return res.status(200).send("The user has been created");
  } catch (err) {
    return res.status(404).send(err);
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

export async function fakeSignUp(req: Request, res: Response) {
  try {
    const { email, displayName, uid } = req.body;
    const userExists = await Users.findOne({
      where: { email: email },
    });
    const fullnameDB = displayName.split(" ").join("-").toLowerCase();
    if (userExists === null) {
      await Users.create({
        id: uid,
        fullname: fullnameDB,
        email: email,
        banned: false,
      });
    }

    sendMail({
      from: "simon__navarrete@hotmail.com",
      subject: "Registro Exitoso! Bienvenido a DevsLearning",
      text: "Bienvenido!",
      to: email,
      html: `<h1>Bienvenido a Devslearning, <strong>${fullnameDB}</strong>!</h1>`,
    });

    res.status(201).send("Succesfully created");
  } catch (error) {
    res.status(400).send(error);
  }
}
