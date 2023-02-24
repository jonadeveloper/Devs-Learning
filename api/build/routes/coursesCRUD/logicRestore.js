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
exports.logicRestoreCourse = void 0;
const { Course, Category } = require("../../db");
function logicRestoreCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.query;
            let course = yield Course.findOne({
                where: { id: id },
                include: {
                    model: Category,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            if (course === undefined)
                return res.status(404).send(`El curso ${name} no existe`);
            yield Course.update({
                deleted: false,
            }, {
                where: {
                    id: id,
                },
            });
            return res.status(200).send(`The course ${name} has been updated`);
        }
        catch (err) {
            return res.status(404).send(err);
        }
    });
}
exports.logicRestoreCourse = logicRestoreCourse;
