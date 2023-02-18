import { recoverPassword, signIn, signUp } from "./usersCRUD/postUser";
import { Router } from "express";
import { updateUserEmail } from "./usersCRUD/putUser";
const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/recover", recoverPassword);
router.put("/updateemail", updateUserEmail);
module.exports = router;
