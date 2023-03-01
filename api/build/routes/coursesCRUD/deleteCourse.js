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
exports.deleteCourse = void 0;
const { Course } = require('../../db');
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.params;
            if (name) {
                let nameDB = name.split(" ").join("-").toLowerCase();
                Course.destroy({
                    where: { "name": nameDB }
                });
                return res.status(200).send(`The course ${name} has been deleted`);
            }
            else {
                return res.status(404).send("The name has not been recognized or has not been entered, please try again.");
            }
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
exports.deleteCourse = deleteCourse;
