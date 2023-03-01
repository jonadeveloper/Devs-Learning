"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meliProducts_1 = require("./mercadopago/meliProducts");
const succesPay_1 = require("./mercadopago/succesPay");
const router = (0, express_1.Router)();
router.post("/", meliProducts_1.payMeli);
router.post("/email", succesPay_1.successMail);
module.exports = router;
