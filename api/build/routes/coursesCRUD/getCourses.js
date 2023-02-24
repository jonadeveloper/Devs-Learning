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
exports.getRatings = exports.getCourses = void 0;
const { Course, Category } = require("../../db");
function getCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name } = req.query;
            const myRegEx = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
            if (name) {
                name = name.split(" ").join("-").toLowerCase();
                let course = yield Course.findAll({
                    where: { name: name },
                    include: {
                        model: Category,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                course.length === 0 ? res.status(404).send(`The course ${name} has not been found`) : res.status(200).send(course);
            }
            let { id } = req.query;
            if (id) {
                if (myRegEx.test(id)) {
                    let course = yield Course.findAll({
                        where: { id: id },
                        include: {
                            model: Category,
                            attributes: ["name"],
                            through: {
                                attributes: [],
                            },
                        },
                    });
                    course.length === 0 ? res.status(404).send("The course has not been found") : res.status(200).send(course);
                }
                else {
                    return res.status(404).send("Id doesn't match type UUID");
                }
            }
            else {
                let course = yield Course.findAll({
                    include: {
                        model: Category,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                return res.status(200).send(course);
            }
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.getCourses = getCourses;
function getRatings(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let courses = yield Course.findAll();
            let ratingsArr = courses.map((el) => {
                return el.rating;
            });
            let ratings = ratingsArr.flatMap((num) => num);
            return res.status(200).send(ratings);
        }
        catch (err) {
            return res.status(200).send(err);
        }
    });
}
exports.getRatings = getRatings;
