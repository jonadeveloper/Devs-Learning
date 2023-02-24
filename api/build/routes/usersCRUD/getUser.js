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
