"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
require("dotenv").config({ path: __dirname + "/.env" });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const { SENDGRID_API_KEY } = process.env;
mail_1.default.setApiKey(SENDGRID_API_KEY);
const sendMail = (msg) => {
    mail_1.default.send(msg).then(() => {
        console.log("Correo enviado");
    }, (error) => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    });
};
exports.sendMail = sendMail;
