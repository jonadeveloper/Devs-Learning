const { Course, Users } = require("../../db");
/*import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const { REACT_APP_FIREBASE_CONFIG } = process.env;
const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;*/

export async function getUsersInfo(req: any, res: any) {
  try {
    const { id } = req.query;
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
