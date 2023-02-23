import { Request, Response } from "express";
/*import { getAuth, deleteUser } from "firebase/auth";
import { initializeApp } from "firebase/app";*/
const { Users } = require("../../db");

/*const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;*/

export async function desBanUser(req: Request, res: Response) {
    try {
        const { id } = req.query;
        await Users.update(
            {
                banned: false,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        return res.status(200).send("Update successfully");
    } catch (err) {
        return res.status(404).send("Error: " + err);
    }
}
