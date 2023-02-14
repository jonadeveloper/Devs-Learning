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
require("dotenv").config();
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            let userCredential = yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
            const user = userCredential.user;
            res.status(200).send(user);
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(404).send(`Error: ${errorCode}, ${errorMessage}`);
        }
    });
}
exports.signIn = signIn;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, email, password } = req.body;
            let userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
            const user = userCredential.user;
            Users.create({
                id: user.uid,
                fullname: fullname,
                email: user.email,
                lastLogin: Date.now(),
            });
            res.status(201).send(user);
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(404).send(`${errorCode}, ${errorMessage}`);
        }
    });
}
exports.signUp = signUp;
