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
      return res.status(200).send("Update successfully");
    } else {
      return res.status(404).send("ID not recognized or not entered, please try again.")
    }
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, cannot update user, please try again.");
  }
}

export async function updateUserRol(req: any, res: any) {
  try {
    const { id, rank } = req.body;
    if(id){
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
      return res.status(200).send("Update email successfully");
    } else {
      return res.status(404).send("ID not recognized or not entered, please try again.")
    }
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, cannot update email, please try again.");
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { email, cart, buy } = req.body;
    if(!email){
      return res.status(404).send("The email has not been recognized or has not been entered, please try again.")
    }
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
    if (user===undefined) return res.status(404).send("The user has not been found");
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
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}
