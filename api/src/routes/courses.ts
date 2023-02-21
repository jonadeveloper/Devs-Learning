import {getCourses, getRatings} from './coursesCRUD/getCourses';
import {postCourse} from './coursesCRUD/postCourse';
import {putCourse, putRating} from './coursesCRUD/putCourse';
import {deleteCourse} from './coursesCRUD/deleteCourse';
import { Router } from 'express';
const router = Router();

router.get("/", getCourses);
router.get("/getRatings", getRatings)
router.post("/", postCourse);
router.put("/", putCourse);
router.put("/putRating", putRating);
router.delete("/:name", deleteCourse);

module.exports = router;