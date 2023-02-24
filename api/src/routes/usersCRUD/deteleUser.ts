import { Request, Response } from "express";
const { Users } = require("../../db");

export async function deleteCurrentUser(req: Request, res: Response) {
  try {
    const { id } = req.query;
    let user = await Users.findOne({
      where: {
        id: id,
      },
    });
    if (user.length > 0) {
      /*await deleteUser(user);*/
      await Users.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send(`The user ${user.name} has been deleted`);
    } else {
      return res.status(404).send("The user has not been found");
    }
  } catch (err) {
    return res.status(404).send("Error: " + err);
  }
}
