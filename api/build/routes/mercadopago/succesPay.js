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
exports.successMail = void 0;
const sendMail_1 = require("../../utils/sendMail");
function successMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { cart, email } = req.body;
            //email de compra exitosa
            let names = cart.map((item) => {
                return `<p>${item.name}</p>`;
            });
            let stringItems = "<h1>Thanks for your purchase</h1><p>The items purchased are:</p>";
            for (let i = 0; i < names.length; i++) {
                stringItems = stringItems + names[i];
            }
            (0, sendMail_1.sendMail)({
                from: "simon__navarrete@hotmail.com",
                subject: "Successful purchase at Devslearning",
                text: "Thank you so much!",
                to: email,
                html: stringItems,
            });
            ///////////////////////////////////
            res.status(201).send(email);
        }
        catch (_a) {
            console.log("No se pudo enviar el correo");
        }
    });
}
exports.successMail = successMail;
