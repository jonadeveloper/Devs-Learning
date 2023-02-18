import { Router } from "express";
import { payMeli } from "./mercadopago/meliProducts";

const router = Router();

router.post("/", payMeli);

module.exports = router;
