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
exports.putCourse = void 0;
const { Course, Category } = require('../../db');
function putCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, level, description, price, category } = req.body;
            let nameDB = name.split(" ").join("-").toLowerCase();
            yield Course.update({
                "level": level,
                "description": description,
                "price": price,
            }, {
                where: {
                    "name": nameDB
                }
            });
            let course = yield Course.findOne({
                where: { "name": nameDB }
            });
            let categoryArr = category.map((el) => {
                return el.split(" ").join("-").toLowerCase();
            });
            categoryArr.forEach((cat) => {
                Category.findOrCreate({
                    where: { "name": cat }
                });
            });
            let categoryDB = yield Category.findAll({
                where: { "name": categoryArr }
            });
            categoryDB.forEach((el) => {
                course.addCategory(el);
            });
            return res.status(200).send(course);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.putCourse = putCourse;
