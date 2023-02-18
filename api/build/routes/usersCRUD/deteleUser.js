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
exports.deleteCurrentUser = void 0;
const auth_1 = require("firebase/auth");
const app_1 = require("firebase/app");
const { Users } = require("../../db");
const { FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(FIREBASE_CONFIG);
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
const user = auth.currentUser;
function deleteCurrentUser(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (user) {
                yield (0, auth_1.deleteUser)(user);
                yield Users.destroy({
                    where: {
                        id: user.uid
                    }
                });
                return res.status(200).send(`The user ${user.displayName} has been deleted`);
            }
            else {
                return res.status(404).send("Something went wrong, try again");
            }
        }
        catch (err) {
            return res.status(404).send("Error: " + err);
        }
    });
}
exports.deleteCurrentUser = deleteCurrentUser;
