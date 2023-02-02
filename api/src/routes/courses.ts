import {getCourses} from './coursesCRUD/getCourses';
import {postCourse} from './coursesCRUD/postCourse';
import {putCourse} from './coursesCRUD/putCourse';
import {deleteCourse} from './coursesCRUD/deleteCourse';
import { Router } from 'express';
const router = Router();

router.get("/", getCourses);
router.post("/", postCourse);
router.put("/", putCourse);
router.delete("/",deleteCourse);

module.exports = router;