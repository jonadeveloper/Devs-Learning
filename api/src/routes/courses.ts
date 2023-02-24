import { getCourses, getRatings } from './coursesCRUD/getCourses';
import { postCourse } from './coursesCRUD/postCourse';
import { putCourse, putRating } from './coursesCRUD/putCourse';
import { deleteCourse } from './coursesCRUD/deleteCourse';
import { Router } from 'express';
import { logicDeleteCourse, logicRestoreCourse } from './coursesCRUD/logicDeleteCourse';
const router = Router();

router.get("/", getCourses);
router.get("/getRatings", getRatings)
router.post("/", postCourse);
router.put("/", putCourse);
router.put("/putRating", putRating);
router.put("/logicDelete", logicDeleteCourse);
router.put("/logicRestore", logicRestoreCourse);


router.delete("/:name", deleteCourse);

module.exports = router;