"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
require("dotenv").config();
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
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
                yield Users.create({
                    id: id,
                    fullname: fullnameDB,
                    email: email,
                    lastLogin: lastSignInTime,
                });
            }
            res.status(201).send(`The user ${fullname} has been created`);
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(404).send(`${errorCode}, ${errorMessage}`);
        }
    });
}
exports.signUp = signUp;
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
