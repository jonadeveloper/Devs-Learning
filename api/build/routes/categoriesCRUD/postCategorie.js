"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCategorie = void 0;
const { Category, Course } = require("../../db");
function postCategorie(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const { name, courses } = req.body;
      let categoryExist = yield Category.findOne({
        where: { name: name },
      });
      if (categoryExist) return res.status(404).send("La categoria ya existe");
      let coursesArr = courses.map((el) => {
        return el.split(" ").join("-").toLowerCase();
      });
      let categoryCreated = yield Category.create({ name });
      let coursesDB = yield Course.findAll({
        where: { name: coursesArr },
      });
      coursesDB.forEach((el) => {
        categoryCreated.addCourse(el);
      });
      return res.status(200).send(`The Category ${name} has been created`);
    } catch (err) {
      return res.status(404).send(err);
    }
  });
}
exports.postCategorie = postCategorie;
