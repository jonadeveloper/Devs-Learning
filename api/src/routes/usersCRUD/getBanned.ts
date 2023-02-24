const { Course, Users } = require("../../db");
/*import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;*/

export async function getBanned(req: any, res: any) {
    try {
        const { email } = req.query;
        if (email) {
            let user = await Users.findAll({
                where: {
                    email: email,
                },
                include: {
                    model: Course,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            if (user.length === 0) {
                return res.status(400).send(`The User has not been found`)
            }
            else if (user[0].banned)
                return res.status(200).send(true);
            else
                return res.status(200).send(false);
        }
        return res.status(500).send(`The User has not been found`);
    } catch (err) {
        return res.status(404).send(err);
    }
}
