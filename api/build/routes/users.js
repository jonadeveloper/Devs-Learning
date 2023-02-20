"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deteleUser_1 = require("../routes/usersCRUD/deteleUser");
const postUser_1 = require("./usersCRUD/postUser");
const putUser_1 = require("./usersCRUD/putUser");
const getUser_1 = require("../routes/usersCRUD/getUser");
const router = (0, express_1.Router)();
router.post("/register", postUser_1.signUp);
//router.post("/login", signIn);
router.post("/recover", postUser_1.recoverPassword);
router.put("/updateEmail", putUser_1.updateUserEmail);
router.put("/updateUser", putUser_1.updateUserProfile);
//router.put("/updatePassword", updateUserPassword);
router.put("/updatePhone", putUser_1.updateUserPhone);
router.get("/usersInfo", getUser_1.getUsersInfo);
router.delete("/deleteCurrentUser", deteleUser_1.deleteCurrentUser);
module.exports = router;
