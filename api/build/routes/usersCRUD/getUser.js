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
exports.getUsersInfo = void 0;
const { Course, Users } = require("../../db");
<<<<<<< HEAD
const auth_1 = require("firebase/auth");
const auth = (0, auth_1.getAuth)();
const user = auth.currentUser;
console.log(user);
function getCurrentUser(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (user) {
                const userDB = yield Users.findOne({
                    where: {
                        id: user === null || user === void 0 ? void 0 : user.uid,
                    },
                    include: {
                        model: Course,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                return res.status(200).send(userDB);
            }
            else {
                return res.status(404).send("Could not find the user");
            }
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.getCurrentUser = getCurrentUser;
function getUsersInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, id } = req.query;
            if (fullname) {
                let fullNameDB = fullname.split(" ").join("-").toLowerCase();
                let user = yield Users.findAll({
                    where: {
                        fullname: fullNameDB,
                    },
                    include: {
                        model: Course,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                user.length === 0
                    ? res.status(400).send(`The User ${fullname} has not been found`)
                    : res.status(200).send(user);
            }
=======
/*import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;*/
function getUsersInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.query;
>>>>>>> cadac4c359792c64d096f0f1418fa7a8cd8c5b1f
            if (id) {
                let user = yield Users.findAll({
                    where: {
                        id: id,
                    },
                    include: {
                        model: Course,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                user.length === 0
                    ? res.status(400).send(`The User has not been found`)
                    : res.status(200).send(user);
            }
            let users = yield Users.findAll({
                include: {
                    model: Course,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            return res.status(200).send(users);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.getUsersInfo = getUsersInfo;
