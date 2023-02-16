import { recoverPassword, signIn, signUp } from "./usersCRUD/postUser";
import { Router } from "express";
const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/recover", recoverPassword);
module.exports = router;
