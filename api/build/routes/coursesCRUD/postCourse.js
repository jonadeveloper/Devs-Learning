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
exports.postCourse = void 0;
const { Course } = require('../../db');
function postCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, level, description, price } = req.body;
            let courseExist = yield Course.findOne({
                where: { "name": name }
            });
            if (courseExist)
                return res.status(404).send("El curso ya existe");
            yield Course.create({ name, level, description, price });
            return res.status(200).send(`The Course ${name} has been created`);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.postCourse = postCourse;
