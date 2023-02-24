const { Users, Course } = require("../../db");
import { Request, Response } from "express";

export async function updateUserProfile(req: Request, res: Response) {
  try {
    const { id, displayName } = req.body;
    if (id) {
      await Users.update(
        {
          fullname: displayName,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).send("Update successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update profile ${error}`);
  }
}

export async function updateUserRol(req: any, res: any) {
  try {
    const { id, rank } = req.body;
    await Users.update(
      {
        rank: rank,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).send("The Rol has been updated");
  } catch (err) {
    return res.status(200).send(err);
  }
}

export async function updateUserEmail(req: Request, res: Response) {
  try {
    const { id, email } = req.body;

    if (id) {
      await Users.update(
        {
          email: email,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).send("Update email successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update email ${error}`);
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { email, cart, buy } = req.body;
    let user = await Users.findOne({
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
    if (buy) {
      let nameCourses = cart.map((el: any) => {
        return el.name.split(" ").join("-").toLowerCase();
      });
      let coursesDB = await Course.findAll({
        where: {
          name: nameCourses,
        },
      });
      coursesDB.forEach((el: any) => {
        user.addCourse(el);
      });
      await Users.update(
        {
          cart: [],
        },
        {
          where: {
            email: email,
          },
        }
      );
      return res.status(200).send("The courses has been created");
    } else {
      await Users.update(
        {
          cart: cart,
        },
        {
          where: {
            email: email,
          },
        }
      );
      return res.status(200).send(`The cart of user ${email} has been updated`);
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}
