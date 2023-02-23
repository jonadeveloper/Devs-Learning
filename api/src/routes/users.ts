import { Router } from "express";
import { deleteCurrentUser } from "../routes/usersCRUD/deteleUser";
import { recoverPassword, signUp } from "./usersCRUD/postUser";
import {
  updateUserEmail,
  updateUserProfile,
  updateUserPhone,
  updateCart,
  updateUserRol
} from "./usersCRUD/putUser";
import { getUsersInfo } from "../routes/usersCRUD/getUser";
import { deleteLogicUser } from "./usersCRUD/logicDeleteUser";
import { desBanUser } from "./usersCRUD/desBanUser";
import { getBanned } from "./usersCRUD/getBanned";
const router = Router();

router.post("/register", signUp);
//router.post("/login", signIn);
router.post("/recover", recoverPassword);
router.put("/updateEmail", updateUserEmail);
router.put("/updateUser", updateUserProfile);
router.put("/updateUserRol", updateUserRol);
//router.put("/updatePassword", updateUserPassword);
router.put("/updateCart", updateCart);
router.put("/updatePhone", updateUserPhone);
router.put("/ban", deleteLogicUser);
router.put("/pardon", desBanUser);
router.get("/banned", getBanned);
router.get("/usersInfo", getUsersInfo);
router.delete("/deleteCurrentUser", deleteCurrentUser);

module.exports = router;
