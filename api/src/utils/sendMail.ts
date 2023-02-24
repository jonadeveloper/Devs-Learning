require("dotenv").config({ path: __dirname + "/.env" });
import { Mail } from "../Interfaces/Mail";
import sgMail from "@sendgrid/mail";
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY as string);
export const sendMail = (msg: Mail) => {
  sgMail.send(msg).then(
    () => {
      console.log("Correo enviado");
    },
    (error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
