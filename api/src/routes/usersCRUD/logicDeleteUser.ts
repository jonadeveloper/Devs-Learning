import { Request, Response } from "express";
const { Users } = require("../../db");

export async function deleteLogicUser(req: Request, res: Response) {
  try {
    const { id } = req.query;
    await Users.update(
      {
        banned: true,
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
