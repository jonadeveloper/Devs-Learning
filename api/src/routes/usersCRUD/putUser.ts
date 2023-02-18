import {
  getAuth,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { Request, Response } from "express";
const auth = getAuth();
const user = auth.currentUser;
console.log(user);
export async function updateUserProfile(req: Request, res: Response) {
  try {
    const { fullname, profileImg } = req.body;
    if (user) {
      await updateProfile(user, {
        displayName: fullname,
        photoURL: profileImg,
      });
      res.status(200).send("Update successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update profile ${error}`);
  }
}

export async function updateUserEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (user) {
      if (user.email !== email) {
        await updateEmail(user, email);
        await Users.update({ email: email }, { where: { id: user.uid } });
      } else {
        throw new Error("Same Email");
      }

      res.status(200).send("Update email successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update email ${error}`);
  }
}

export async function updateUserPassword(req: Request, res: Response) {
  try {
    const { password } = req.body;
    if (user) {
      await updatePassword(user, password);
      res.status(200).send("Update password successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update password ${error}`);
  }
}

export async function updateUserPhone(req: Request, res: Response) {
  try {
    const { phoneNumber } = req.body;
    if (user) {
      await updatePhoneNumber(user, phoneNumber);
      res.status(200).send("Update phone number successfully");
    }
  } catch (error) {
    res.status(400).send(`Cannot update phone number ${error}`);
  }
}
