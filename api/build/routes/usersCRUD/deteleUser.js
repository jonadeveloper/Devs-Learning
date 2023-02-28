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
const { Users } = require("../../db");
function deleteCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            const user = yield Users.findOne({
                where: {
                    id: id,
                },
            });
            if (user) {
                Users.destroy({
                    where: {
                        id: id,
                    },
                });
                return res.status(200).send(`The user has been deleted`);
            }
            return res.status(401).send(`The user doesnt exists`);
        }
        catch (err) {
            return res.status(404).send("Error: " + err);
        }
    });
}
exports.deleteCurrentUser = deleteCurrentUser;
