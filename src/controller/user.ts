import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";
import { deleteCollection } from "../lib/deletionHelper";

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
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { fullName, email } = req.body;
    let userNames: string[] = [""];
    if (typeof fullName === "string") {
      userNames = fullName.split(" ");
    }
    console.log({
      email,
      firstName: userNames[0],
      fullName,
    });
    await auth.updateUser(uid, { displayName: userNames[0], email });
    await db.collection("profile").doc(uid).update({
      email,
      firstName: userNames[0],
      fullName,
    });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { password } = req.body;
    await auth.updateUser(uid, { password });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;

    await auth.deleteUser(uid);
    await db.collection("profile").doc(uid).delete();
    await db
      .collection("profile")
      .doc(uid)
      .collection("survey")
      .doc(uid)
      .delete();
    await deleteCollection(`/profile/${uid}/action-log`, 100);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const user = await db.collection("profile").doc(uid).get();
    res.status(201).json(user.data());
  } catch (error) {
    return res.status(400).json(error);
  }
};
