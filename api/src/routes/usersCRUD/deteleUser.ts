import { Request, Response } from "express";
import { getAuth, deleteUser } from "firebase/auth";
import { initializeApp } from "firebase/app";
const { Users } = require("../../db");

const { FIREBASE_CONFIG } = process.env;

const firebaseConfig = JSON.parse(FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

export async function deleteCurrentUser(_req: Request, res: Response){
    try{
        if(user){
            await deleteUser(user);
            await Users.destroy({
                where: {
                    id: user.uid
                }
            });
            return res.status(200).send(`The user ${user.displayName} has been deleted`);
        } else {
            return res.status(404).send("Something went wrong, try again");
        }
    }catch(err){
        return res.status(404).send("Error: " + err);
    }
}
