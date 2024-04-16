import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { uid, email } = req.user!;
    const { fullName } = req.body;
    let userNames: string[] = [""];
    if (typeof fullName === "string") {
      userNames = fullName.split(" ");
    }
    await auth.updateUser(uid, { displayName: userNames[0] });
    const user = await db.collection("profile").doc(uid).set({
      email,
      firstName: userNames[0],
      fullName,
    });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const user = await db.collection("profile").doc(uid).get();
    console.log(user.data(), "m");
    res.status(201).json(user.data());
  } catch (error) {
    return res.status(400).json(error);
  }
};
