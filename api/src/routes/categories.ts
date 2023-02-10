import {getCategories} from './categoriesCRUD/getCategories';
import {postCategorie} from './categoriesCRUD/postCategorie';
import {putCategorie} from './categoriesCRUD/putCategorie';
import {deleteCategorie} from './categoriesCRUD/deleteCategorie';
import { Router } from 'express';
const router = Router();

<<<<<<< HEAD
router.get("/:name", getCategories);
=======
<<<<<<< HEAD
router.get("/", getCategories);
=======
router.get("/:name", getCategories);
>>>>>>> development
>>>>>>> dataBase
router.post("/", postCategorie);
router.put("/", putCategorie);
router.delete("/:name",deleteCategorie);

module.exports = router;