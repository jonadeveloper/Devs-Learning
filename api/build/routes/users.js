"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postUser_1 = require("./usersCRUD/postUser");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", postUser_1.signUp);
router.post("/login", postUser_1.signIn);
module.exports = router;
