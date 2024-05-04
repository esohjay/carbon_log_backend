import { FieldValue } from "firebase-admin/firestore";
import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";

export const addAction = async (req: Request, res: Response) => {
  try {
    // const { uid, email } = req.user!;
    const { sdg, description, emission, title, category } = req.body;

    const action = await db.collection("action").add({
      sdg,
      description,
      emission,
      title,
      category,
      timestamp: FieldValue.serverTimestamp(),
    });
    console.log(action.get());
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getActions = async (req: Request, res: Response) => {
  try {
    const actionsSnapshot = await db.collection("action").get();
    res.status(201).json(
      actionsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};
