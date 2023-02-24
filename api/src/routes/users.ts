import { Router } from "express";
import { deleteCurrentUser } from "../routes/usersCRUD/deteleUser";
import {
  fakeSignUp,
  recoverPassword,
  signUp,
  signUpDB,
} from "./usersCRUD/postUser";
import {
  updateUserEmail,
  updateUserProfile,
  updateCart,
  updateUserRol,
} from "./usersCRUD/putUser";
import { getUsersInfo } from "../routes/usersCRUD/getUser";
import { deleteLogicUser } from "./usersCRUD/logicDeleteUser";
import { desBanUser } from "./usersCRUD/desBanUser";
import { getBanned } from "./usersCRUD/getBanned";
const router = Router();

router.post("/register", signUp);
router.post("/registerDB", signUpDB);
router.post("/fake", fakeSignUp);
router.post("/recover", recoverPassword);
router.put("/updateemail", updateUserEmail);
router.put("/updateusername", updateUserProfile);
router.put("/updateUserRol", updateUserRol);
router.put("/updateCart", updateCart);
router.put("/ban", deleteLogicUser);
router.put("/pardon", desBanUser);
router.get("/banned", getBanned);
router.get("/usersInfo", getUsersInfo);
router.delete("/deleteCurrentUser", deleteCurrentUser);

module.exports = router;
