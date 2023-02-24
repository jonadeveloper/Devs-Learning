"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payMeli = void 0;
require("dotenv").config({ path: __dirname + "/.env" });
const { mercadopago } = require("./mercadopago");
const { FRONTEND_URL } = process.env;
function payMeli(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart = req.body;
            let items = cart.map((course) => {
                return {
                    title: course.name,
                    description: course.description,
                    picture_url: course.img,
                    quantity: 1,
                    currency_id: "ARS",
                    unit_price: parseInt(course.price),
                };
            });
            // Crea un objeto de preferencia
            const preference = {
                // This is always true * REQUIRED
                binary_mode: true,
                // The data of the item that the user has to pay for * REQUIRED
                items: items,
                // Data of the user * REQUIRED
                // payer: {
                //   name: "juan",
                //   surname: "pepe",
                //   email: "asdasd@gmail.com",
                // },
                // When the user finishes the payment, depending of the status of the payment he'll be redirected, you gotta put your custom urls
                back_urls: {
                    success: `${FRONTEND_URL}/payment/success`,
                    failure: `${FRONTEND_URL}/courses`,
                    // pending: "https://pending.com",
                },
                // This is always "approved"
                auto_return: "approved",
            };
            mercadopago.preferences
                .create(preference)
                .then(function (response) {
                // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
                res.status(200).json({ global: response.body.id });
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
}
exports.payMeli = payMeli;
