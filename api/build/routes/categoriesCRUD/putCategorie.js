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
exports.putCategorie = void 0;
const { Course, Category } = require("../../db");
function putCategorie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, img, description, course } = req.body;
            let nameDB = name.split(" ").join("-").toLowerCase();
            let category = yield Category.findOne({
                where: { name: nameDB },
                include: {
                    model: Course,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            if (category === undefined)
                return res.status(404).send(`La categoria ${name} no existe`);
            yield Category.update({
                img: img ? img : category.img,
                description: description ? description : category.description
            }, {
                where: {
                    name: nameDB,
                },
            });
            if (course) {
                let newCourses = course.map((el) => {
                    return el.split(" ").join("-").toLowerCase();
                });
                let coursesArr = category.courses.map((course) => {
                    return course.name;
                });
                let oldCourses = yield Course.findAll({
                    where: {
                        name: coursesArr
                    }
                });
                oldCourses.forEach((el) => {
                    category.removeCourse(el);
                });
                let coursesDB = yield Course.findAll({
                    where: { name: newCourses },
                });
                coursesDB.forEach((el) => {
                    category.addCourse(el);
                });
            }
            ;
            return res.status(200).send(`The category ${name} has been updated`);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.putCategorie = putCategorie;
