"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCourses_1 = require("./coursesCRUD/getCourses");
const postCourse_1 = require("./coursesCRUD/postCourse");
const putCourse_1 = require("./coursesCRUD/putCourse");
const deleteCourse_1 = require("./coursesCRUD/deleteCourse");
const express_1 = require("express");
const logicDeleteCourse_1 = require("./coursesCRUD/logicDeleteCourse");
const getSales_1 = require("./coursesCRUD/getSales");
const router = (0, express_1.Router)();
router.get("/", getCourses_1.getCourses);
router.get("/getRatings", getCourses_1.getRatings);
router.post("/", postCourse_1.postCourse);
router.put("/", putCourse_1.putCourse);
router.put("/putRating", putCourse_1.putRating);
router.put("/logicDelete", logicDeleteCourse_1.logicDeleteCourse);
router.put("/logicRestore", logicDeleteCourse_1.logicRestoreCourse);
router.get("/sales", getSales_1.getSales);
router.delete("/:name", deleteCourse_1.deleteCourse);
module.exports = router;
