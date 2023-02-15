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
exports.getCategories = void 0;
const { Category, Course } = require("../../db");
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name } = req.query;
            if (name) {
                name = name.split(" ").join("-").toLowerCase();
                let category = yield Category.findAll({
                    where: { name: name },
                    include: {
                        model: Course,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                category.length === 0 ? res.status(404).send(`The category ${name} has not been found`) : res.status(200).send(category);
            }
            else {
                let category = yield Category.findAll({
                    where: {},
                    include: {
                        model: Course,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                });
                return res.status(200).send(category);
            }
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.getCategories = getCategories;
