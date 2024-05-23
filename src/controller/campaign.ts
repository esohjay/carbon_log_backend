import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";
import { ActionBody } from "../types/action";
import { calculatePoint } from "../lib/calculatePoint";
import generateId from "../lib/generateId";
import { deleteCollection } from "../lib/deletionHelper";

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { uid, email } = req.user!;
    const { description, title } = req.body;

    const campaign = await db.collection("campaign").add({
      description,
      title,
      timestamp: FieldValue.serverTimestamp(),
      createdBy: uid,
      users: FieldValue.arrayUnion(uid),
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const joinCampaign = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { campaignId } = req.params;
    const campaignRef = db.collection("campaign").doc(campaignId);
    await campaignRef.update({
      users: FieldValue.arrayUnion(uid),
    });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const leaveCampaign = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { campaignId } = req.params;
    const campaignRef = db.collection("campaign").doc(campaignId);
    await campaignRef.update({
      users: FieldValue.arrayRemove(uid),
    });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const conversation = async (req: Request, res: Response) => {
  try {
    const { uid, name } = req.user!;
    console.log(req.user);
    const { campaignId } = req.params;

    const messageRef = db
      .collection("campaign")
      .doc(campaignId)
      .collection("messages");

    await messageRef.add({
      sender: { id: uid, name },
      message: req.body.message,
      timestamp: Timestamp.now(),
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getConversation = async (req: Request, res: Response) => {
  try {
    const { uid, displayName } = req.user!;
    const { campaignId } = req.params;
    const messageRef = await db
      .collection("campaign")
      .doc(campaignId)
      .collection("messages")
      .get();

    res.status(201).json(
      messageRef.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaignsSnapshot = await db.collection("campaign").get();
    res.status(201).json(
      campaignsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getCampaign = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const campaignsSnapshot = await db
      .collection("campaign")
      .doc(campaignId)
      .get();

    res.status(201).json(campaignsSnapshot.data());
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getJoinedCampaigns = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const campaignsSnapshot = await db
      .collection("campaign")
      .where("users", "array-contains", uid)
      .get();

    res.status(201).json(
      campaignsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const campaignRef = db.collection("campaign").doc(campaignId);
    await campaignRef.update({
      ...req.body,
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const campaignRef = db.collection("campaign").doc(campaignId);
    await campaignRef.delete();

    await deleteCollection(`/campaign/${campaignId}/messages`, 100);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
