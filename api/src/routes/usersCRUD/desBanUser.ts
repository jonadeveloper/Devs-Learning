import { Request, Response } from "express";
const { Users } = require("../../db");

export async function desBanUser(req: Request, res: Response) {
    try {
        const { id } = req.query;
        if(id){
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
        } else {
            return res.status(404).send("The ID has not been recognized or has not been entered, please try again.")
        }
    } catch (err: any) {
        const errName = err.name;
        const errCode = err.code;
        const errMessage = err.message;
        return res.status(404).send(errName ? 
            `Error ${errCode}: ${errName} - ${errMessage}` : 
            "Something went wrong, please try again.");
    }
}
