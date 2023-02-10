import { signIn, signUp } from "./usersCRUD/postUser";
import { Router } from "express";
const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);

module.exports = router;
