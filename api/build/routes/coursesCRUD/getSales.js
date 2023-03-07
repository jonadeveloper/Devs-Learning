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
exports.getSales = void 0;
const { UserCourses, Users } = require("../../db");
function getSales(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sales = yield UserCourses.findAll();
            let users = yield Users.findAll();
            let result = yield sales.map((sale) => {
                let user = users.find((user) => user.id === sale.userId);
                user.fullname = user.fullname[0].toUpperCase() + user.fullname.substring(1);
                return Object.assign(Object.assign({}, sale.dataValues), { user_name: user.fullname.replace("-", " "), email: user.email });
            });
            res.send(result);
        }
        catch (err) {
            const errName = err.name;
            const errCode = err.code;
            const errMessage = err.message;
            return res.status(404).send(errName ?
                `Error ${errCode}: ${errName} - ${errMessage}` :
                "Something went wrong, please try again.");
        }
    });
}
exports.getSales = getSales;
