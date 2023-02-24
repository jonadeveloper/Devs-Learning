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
exports.updateCart = exports.updateUserEmail = exports.updateUserRol = exports.updateUserProfile = void 0;
const { Users, Course } = require("../../db");
function updateUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, displayName } = req.body;
            if (id) {
                yield Users.update({
                    fullname: displayName,
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
function updateUserRol(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, rank } = req.body;
            yield Users.update({
                rank: rank,
            }, {
                where: {
                    id: id,
                },
            });
            return res.status(200).send("The Rol has been updated");
        }
        catch (err) {
            return res.status(200).send(err);
        }
    });
}
exports.updateUserRol = updateUserRol;
function updateUserEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, email } = req.body;
            if (id) {
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
function updateCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, cart, buy } = req.body;
            let user = yield Users.findOne({
                where: {
                    email: email,
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
                        name: nameCourses,
                    },
                });
                coursesDB.forEach((el) => {
                    user.addCourse(el);
                });
                yield Users.update({
                    cart: [],
                }, {
                    where: {
                        email: email,
                    },
                });
                return res.status(200).send("The courses has been created");
            }
            else {
                yield Users.update({
                    cart: cart,
                }, {
                    where: {
                        email: email,
                    },
                });
                return res.status(200).send(`The cart of user ${email} has been updated`);
            }
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.updateCart = updateCart;
