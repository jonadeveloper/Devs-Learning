import { Router } from "express";
import { payMeli } from "./mercadopago/meliProducts";
import { successMail } from "./mercadopago/succesPay";

const router = Router();

router.post("/", payMeli);
router.post("/email", successMail);

module.exports = router;
