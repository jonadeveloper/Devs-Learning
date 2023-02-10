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
exports.signUp = exports.signIn = void 0;
const { Users } = require("../../db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            Users.findOne({
                where: {
                    email: email,
                },
            })
                .then((user) => {
                if (!user)
                    return res.status(404).json({ msg: "Wrong Email" });
                if (bcrypt.compareSync(password, user.password)) {
                    let tk = jwt.sign({ Users: user }, process.env.AUTH_SECRET, {
                        expiresIn: process.env.AUTH_EXPIRES,
                    });
                    res.json({ Users: user, token: tk });
                }
                else {
                    return res.status(401).json({ msg: "Wrong Password" });
                }
                return "algo";
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signIn = signIn;
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, password, email } = req.body;
            let userExist = yield Users.findOne({
                where: {
                    email: email,
                },
            });
            if (userExist)
                throw new Error("Email already exists");
            if (password.length < 8)
                throw new Error("Password must have a minimum length of 8 characters");
            let pwdEnc = bcrypt.hashSync(password, Number(process.env.AUTH_ROUNDS));
            Users.create({
                fullname: fullname,
                email: email,
                password: pwdEnc,
                lastLogin: Date.now(),
            })
                .then((user) => {
                let tk = jwt.sign({ Users: user }, process.env.AUTH_SECRET, {
                    expiresIn: process.env.AUTH_EXPIRES,
                });
                res.json({
                    user: user,
                    token: tk,
                });
            })
                .catch((error) => {
                res.status(500).json(error.message);
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signUp = signUp;
//import { initializeApp } from "firebase/app";
//import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
/*export async function createUser(req: any, res: any, next: NextFunction) {
  try {
    const { displayName, password, email } = req.body;

    const firebaseConfig = {
      apiKey: "AIzaSyC2NdZp4--hGRr-W9sEHkrK8yVCo1OKN70",
      dataBaseURL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
      authDomain: "devslearning-76766.firebaseapp.com",
      projectId: "devslearning-76766",
      storageBucket: "devslearning-76766.appspot.com",
      messagingSenderId: "508465796522",
      appId: "1:508465796522:web:9c6070d8abb6a4680a47d3",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    let userExist = await Users.findOne({
      where: { email: email },
    });

    if (userExist) return res.status(404).send("User Exist");

    if (password.length < 8)
      throw new Error("Password minimun length required is 8");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Users.create({
          displayName: displayName,
          profileImg: user.photoURL,
          id: user.uid,
          email: user.email,
          accessToken: user.providerId,
        })
          .then(() => {
            res.json(201).send(user);
          })
          .catch((err: Error) => {
            res.status(500).json({ err: err.message });
          });
      })
      .catch((error) => {
        res.status(401).send(`${error.code}, ${error.message}`);
      });
  } catch (error) {
    next(error);
  }
}*/
