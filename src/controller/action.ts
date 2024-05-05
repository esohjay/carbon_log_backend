import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";
import { ActionBody } from "../types/action";
import { calculatePoint } from "../lib/calculatePoint";
import generateId from "../lib/generateId";

export const addAction = async (req: Request, res: Response) => {
  try {
    // const { uid, email } = req.user!;
    const { sdg, description, emission, title, category } =
      req.body as ActionBody;

    const action = await db.collection("action").add({
      sdg,
      description,
      emission,
      title,
      category,
      point: calculatePoint(emission),
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
export const logAction = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { emission, title, category, point, id } = req.body as ActionBody;
    console.log(emission, uid);
    const actionRef = db.collection("actionLog").doc(uid);
    const doc = await actionRef.get();
    const logId = generateId();
    const timestamp = Timestamp.now();
    if (!doc.exists) {
      console.log(logId);
      await actionRef.set({
        carbonSaved: emission,
        pointsEarned: point,
        actions: [
          { actionId: id, title, id: logId, emission, category, timestamp },
        ],
      });
    } else {
      console.log("exist");
      await actionRef.update({
        carbonSaved: FieldValue.increment(emission),
        pointsEarned: FieldValue.increment(point),
        actions: FieldValue.arrayUnion({
          actionId: id,
          title,
          id: logId,
          emission,
          category,
          timestamp,
        }),
      });
    }

    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getLoggedAction = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const actionRef = db.collection("actionLog").doc(uid);
    const doc = await actionRef.get();
    res.status(201).json({ message: "Success", data: doc.data() });
  } catch (error) {
    return res.status(400).json(error);
  }
};
