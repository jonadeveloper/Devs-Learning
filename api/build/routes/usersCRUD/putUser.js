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
exports.updateCart = exports.updateUserPhone = exports.updateUserEmail = exports.updateUserProfile = void 0;
const { Users, Course } = require("../../db");
/*import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;*/
function updateUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, fullname, profileImg } = req.body;
            if (id) {
                /*await updateProfile(user, {
                  displayName: fullname,
                  photoURL: profileImg,
                });*/
                yield Users.update({
                    fullname: fullname,
                    profileImg: profileImg,
                }, {
                    where: {
                        id: id,
                    },
                });
                res.status(200).send("Update successfully");
            }
        }
        catch (error) {
            res.status(400).send(`Cannot update profile ${error}`);
        }
    });
}
exports.updateUserProfile = updateUserProfile;
function updateUserEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, email } = req.body;
            if (id) {
                /*if (user.email !== email) {
                  await updateEmail(user, email);
                } else {
                  throw new Error("Same Email");
                }*/
                yield Users.update({
                    email: email,
                }, {
                    where: { id: id },
                });
                res.status(200).send("Update email successfully");
            }
        }
        catch (error) {
            res.status(400).send(`Cannot update email ${error}`);
        }
    });
}
exports.updateUserEmail = updateUserEmail;
/*export async function updateUserPassword(req: Request, res: Response) {
  try {
    const { password } = req.body;
    if (user) {
      await updatePassword(user, password);
      res.status(200).send("Update password successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update password ${error}`);
  }
}*/
function updateUserPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, phoneNumber } = req.body;
            if (id) {
                /*await updatePhoneNumber(user, phoneNumber);*/
                yield Users.update({
                    phoneNumber: phoneNumber,
                }, {
                    where: { id: id },
                });
                res.status(200).send("Update phone number successfully");
            }
        }
        catch (error) {
            res.status(400).send(`Cannot update phone number ${error}`);
        }
    });
}
exports.updateUserPhone = updateUserPhone;
function updateCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, cart, buy } = req.body;
            let fullnameDB = fullname.split(" ").join("-").toLowerCase();
            let user = yield Users.findAll({
                where: {
                    fullname: fullnameDB
                },
                include: {
                    model: Course,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            if (buy) {
                let nameCourses = cart.map((el) => {
                    return el.name.split(" ").join("-").toLowerCase();
                });
                let coursesDB = yield Course.findAll({
                    where: {
                        name: nameCourses
                    }
                });
                coursesDB.forEach((el) => {
                    user[0].addCourse(el);
                });
                yield Users.update({
                    cart: []
                }, {
                    where: {
                        fullname: fullnameDB
                    }
                });
                return res.status(200).send("The courses has been created");
            }
            else {
                yield Users.update({
                    cart: cart
                }, {
                    where: {
                        fullname: fullnameDB
                    }
                });
                return res.status(200).send(`The cart of user ${fullname} has been updated`);
            }
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.updateCart = updateCart;
