import { Router } from "express";
import { deleteCurrentUser } from "../routes/usersCRUD/deteleUser";
import { recoverPassword, signIn, signUp } from "./usersCRUD/postUser";
import { updateUserEmail, updateUserProfile, updateUserPassword, updateUserPhone } from "./usersCRUD/putUser";
import { getCurrentUser, getUsersInfo } from "../routes/usersCRUD/getUser";
const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/recover", recoverPassword);
router.put("/updateEmail", updateUserEmail);
router.put("/updateUser", updateUserProfile);
router.put("/updatePassword", updateUserPassword);
router.put("/updatePhone", updateUserPhone);
router.get("/currentUser", getCurrentUser);
router.get("/usersInfo", getUsersInfo);
router.delete("/deleteCurrentUser", deleteCurrentUser);

module.exports = router;
