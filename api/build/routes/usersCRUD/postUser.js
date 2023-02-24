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
exports.fakeSignUp = exports.recoverPassword = exports.signUpDB = exports.signUp = void 0;
require("dotenv").config();
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const sendMail_1 = require("../../utils/sendMail");
const { FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(FIREBASE_CONFIG);
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
const { Users } = require("../../db");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, email, password } = req.body;
            let userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
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
            yield (0, auth_1.updateProfile)(user, { displayName: fullname }).catch((err) => {
                throw new Error(err);
            });
            (0, sendMail_1.sendMail)({
                from: "simon__navarrete@hotmail.com",
                subject: "Registro Exitoso! Bienvenido a DevsLearning",
                text: "Bienvenido!",
                to: email,
                html: `<h1>Bienvenido a Devslearning, <strong>${fullname}</strong>!</h1>`,
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
function signUpDB(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, fullname, email, rank } = req.body;
            const fullnameDB = fullname.split(" ").join("-").toLowerCase();
            yield Users.create({
                id: id,
                fullname: fullnameDB,
                email: email,
                rank: rank,
            });
            return res.status(200).send("The user has been created");
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.signUpDB = signUpDB;
function recoverPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            yield (0, auth_1.sendPasswordResetEmail)(auth, email);
            res.status(200).send("Check your email, remember check spam folder");
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(404).send(`${errorCode}, ${errorMessage}`);
        }
    });
}
exports.recoverPassword = recoverPassword;
function fakeSignUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, displayName, uid } = req.body;
            const userExists = yield Users.findOne({
                where: { email: email },
            });
            const fullnameDB = displayName.split(" ").join("-").toLowerCase();
            if (userExists === null) {
                yield Users.create({
                    id: uid,
                    fullname: fullnameDB,
                    email: email,
                    banned: false,
                });
            }
            (0, sendMail_1.sendMail)({
                from: "simon__navarrete@hotmail.com",
                subject: "Registro Exitoso! Bienvenido a DevsLearning",
                text: "Bienvenido!",
                to: email,
                html: `<h1>Bienvenido a Devslearning, <strong>${fullnameDB}</strong>!</h1>`,
            });
            res.status(201).send("Succesfully created");
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
exports.fakeSignUp = fakeSignUp;
