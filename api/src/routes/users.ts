import { Router } from "express";
import { deleteCurrentUser } from "../routes/usersCRUD/deteleUser";
import { fakeSignUp, recoverPassword, signUp } from "./usersCRUD/postUser";
import {
  updateUserEmail,
  updateUserProfile,
  updateCart,
  updateUserRol,
} from "./usersCRUD/putUser";
import { getUsersInfo } from "../routes/usersCRUD/getUser";
const router = Router();

router.post("/register", signUp);
router.post("/fake", fakeSignUp);
router.post("/recover", recoverPassword);
router.put("/updateemail", updateUserEmail);
router.put("/updateUser", updateUserProfile);
router.put("/updateUserRol", updateUserRol);
//router.put("/updatePassword", updateUserPassword);
router.put("/updateCart", updateCart);
router.get("/usersInfo", getUsersInfo);
router.delete("/deleteCurrentUser", deleteCurrentUser);

module.exports = router;
