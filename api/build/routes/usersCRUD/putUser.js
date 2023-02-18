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
exports.updateUserPhone = exports.updateUserPassword = exports.updateUserEmail = exports.updateUserProfile = void 0;
const { Users } = require("../../db");
const auth_1 = require("firebase/auth");
const auth = (0, auth_1.getAuth)();
const user = auth.currentUser;
function updateUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, profileImg } = req.body;
            if (user) {
                yield (0, auth_1.updateProfile)(user, {
                    displayName: fullname,
                    photoURL: profileImg,
                });
                yield Users.update({
                    fullname: fullname,
                    profileImg: profileImg
                }, {
                    where: {
                        id: user.uid
                    }
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
            const { email } = req.body;
            if (user) {
                if (user.email !== email) {
                    yield (0, auth_1.updateEmail)(user, email);
                    yield Users.update({ email: email }, { where: { id: user.uid } });
                }
                else {
                    throw new Error("Same Email");
                }
                res.status(200).send("Update email successfully");
            }
        }
        catch (error) {
            res.status(400).send(`Cannot update email ${error}`);
        }
    });
}
exports.updateUserEmail = updateUserEmail;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            if (user) {
                yield (0, auth_1.updatePassword)(user, password);
                res.status(200).send("Update password successfully");
            }
        }
        catch (error) {
            res.status(400).send(`Cannot update password ${error}`);
        }
    });
}
exports.updateUserPassword = updateUserPassword;
function updateUserPhone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phoneNumber } = req.body;
            if (user) {
                yield (0, auth_1.updatePhoneNumber)(user, phoneNumber);
                yield Users.update({ phoneNumber: phoneNumber }, { where: { id: user.uid } });
                res.status(200).send("Update phone number successfully");
            }
        }
        catch (error) {
            res.status(400).send(`Cannot update phone number ${error}`);
        }
    });
}
exports.updateUserPhone = updateUserPhone;
