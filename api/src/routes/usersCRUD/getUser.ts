const { Course, Users } = require("../../db");
import { getAuth } from "firebase/auth";
import { Request, Response } from "express";

const auth = getAuth();
const user = auth.currentUser;

export async function getCurrentUser(_req: Request, res: Response) {
  try {
    if (user) {
      const userDB = await Users.findOne({
        where: {
          id: user?.uid,
        },
        include: {
          model: Course,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).send(userDB);
    } else {
      return res.status(404).send("Could not find the user");
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}

export async function getUsersInfo(req: any, res: any) {
  try {
    const { fullname, id } = req.query;
    if (fullname) {
      let fullNameDB = fullname.split(" ").join("-").toLowerCase();
      let user = await Users.findAll({
        where: {
          fullname: fullNameDB,
        },
        include: {
          model: Course,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      user.length === 0
        ? res.status(400).send(`The User ${fullname} has not been found`)
        : res.status(200).send(user);
    }
    if (id) {
      let user = await Users.findAll({
        where: {
          id: id,
        },
        include: {
          model: Course,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      user.length === 0
        ? res.status(400).send(`The User has not been found`)
        : res.status(200).send(user);
    }
    let users = await Users.findAll({
      include: {
        model: Course,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return res.status(200).send(users);
  } catch (err) {
    return res.status(404).send(err);
  }
}
