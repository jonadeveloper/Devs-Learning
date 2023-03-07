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
    if(!email || !password){
      return res.status(404).send("The email or password is wrong")
    }
    if(!fullname){
      return res.status(404).send("The ID has not been recognized or has not been entered, please try again.")
    }
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userExists = Users.findOne({ where: { email: email } });
    const fullnameDB = fullname.split(" ").join("-").toLowerCase();
    if (user && userExists) {
      Users.create({
        id: user.uid,
        fullname: fullnameDB,
        email: user.email,
        lastLogin: user.metadata.creationTime,
        banned: false,
        rank: "student"
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
    return res.status(201).send(user);
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}

export async function signUpDB(req: Request, res: Response) {
  try {
    const { id, fullname, email, rank } = req.body;
    if(!id || !fullname){
      return res.status(404).send("The ID or name has not been recognized or has not been entered, please try again.")
    }
    const fullnameDB = fullname.split(" ").join("-").toLowerCase();
    await Users.create({
      id: id,
      fullname: fullnameDB,
      email: email,
      rank: rank,
    });
    return res.status(200).send("The user has been created");
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}

export async function recoverPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if(email){
      await sendPasswordResetEmail(auth, email);
      return res.status(200).send("Check your email, remember check spam folder");
    } else {
      return res.status(404).send("The email has not been recognized or has not been entered, please try again.")
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return res.status(404).send(`${errorCode}, ${errorMessage}`);
  }
}

export async function fakeSignUp(req: Request, res: Response) {
  try {
    const { email, displayName, uid } = req.body;
    if(!uid || !displayName){
      return res.status(404).send("The ID or name has not been recognized or has not been entered, please try again.")
    }
    const userExists = await Users.findOne({
      where: { id: uid },
    });
    const fullnameDB = displayName.split(" ").join("-").toLowerCase();
    if (!userExists) {
      await Users.create({
        id: uid,
        fullname: fullnameDB,
        email: email,
        banned: false,
        rank: "student"
      });
      sendMail({
        from: "simon__navarrete@hotmail.com",
        subject: "Registro Exitoso! Bienvenido a DevsLearning",
        text: "Bienvenido!",
        to: email,
        html: `<h1>Bienvenido a Devslearning, <strong>${fullnameDB}</strong>!</h1>`,
      });
      return res.status(201).send("Succesfully created");
    }
    return res.status(201).send("Succesfully login");
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(400).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}
