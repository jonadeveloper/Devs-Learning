import { getCategories } from "./categoriesCRUD/getCategories";
import { postCategorie } from "./categoriesCRUD/postCategorie";
import { putCategorie } from "./categoriesCRUD/putCategorie";
import { deleteCategorie } from "./categoriesCRUD/deleteCategorie";
import { Router } from "express";
const router = Router();

router.get("/", getCategories);
router.post("/", postCategorie);
router.put("/", putCategorie);
router.delete("/:name", deleteCategorie);

module.exports = router;
