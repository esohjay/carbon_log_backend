import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";
import { ActivityResponse } from "../types/track";
import {
  calculateEnergy,
  calculateCar,
  calculateFlight,
  calculateBike,
  calculatePublicTransport,
  calculateGoodsAndServices,
} from "../lib/calculateCF";
import {
  carSizeCF,
  energyCF,
  flightCF,
  priceMultiplier,
  motorBikeCF,
  publicTransportCF,
  dietaryCF,
} from "../lib/surveyData";
import { FieldValue } from "firebase-admin/firestore";

export const addActivity = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { activity, amount, category } = req.body as ActivityResponse;

    const emission = amount * priceMultiplier[activity];

    const trackRef = db.collection("track").doc(uid);
    const doc = await trackRef.get();
    if (!doc.exists) {
      await trackRef.set({
        [category]: [{ activity, amount, emission }],
      });
    } else {
      await trackRef.update({
        [category]: FieldValue.arrayUnion({ activity, amount, emission }),
      });
    }

    res.status(201).json({
      message: "Success",
      data: { activity, amount, emission },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
