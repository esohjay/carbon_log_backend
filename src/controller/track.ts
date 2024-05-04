import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";
import {
  ActivityResponse,
  FlightResponse,
  TravelResponse,
} from "../types/track";
import { CarData, BikeData, TransportResponse } from "../types/surveyResponse";
import { TravelArgs } from "../types/track";
import { handleTravel } from "../lib/handleTravel";
import generateId from "../lib/generateId";
import {
  carSizeCF,
  flightCF,
  priceMultiplier,
  motorBikeCF,
  publicTransportCF,
} from "../lib/surveyData";
import { calculateCar, calculateBike } from "../lib/calculateCfactor";
import { FieldValue } from "firebase-admin/firestore";
import { averageFlightDistance } from "../lib/surveyData";

export const addTravelActivity = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { flight, publicTransport, car, bike } = req.body as TravelResponse;
    let data!: TravelArgs;
    let emission = 0;
    if (flight) {
      const { trip, distance } = flight;
      if (trip === "return") {
        emission += flightCF[distance] * averageFlightDistance[distance] * 2;
      } else {
        emission += flightCF[distance] * averageFlightDistance[distance];
      }
      data = await handleTravel({
        emission,
        value: distance,
        mode: "flight",
        unit: null,
        uid,
      });
    }
    if (publicTransport) {
      const { distance, unit, transportMode } = publicTransport;
      emission += publicTransportCF[transportMode][unit] * distance;
      data = await handleTravel({
        emission,
        value: distance,
        mode: "publicTransport",
        unit,
        uid,
      });
    }
    if (car) {
      emission += calculateCar([car], carSizeCF);
      data = await handleTravel({
        emission,
        value: car.value,
        mode: "car",
        unit: car.unit,
        uid,
      });
    }
    if (bike) {
      emission += calculateBike([bike], motorBikeCF);
      data = await handleTravel({
        emission,
        value: bike.value,
        mode: "bike",
        unit: bike.unit,
        uid,
      });
    }

    res.status(201).json({
      message: "Success",
      data: { ...data, category: "travel" },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const addActivity = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const { activity, amount, category } = req.body as ActivityResponse;

    const emission = amount * priceMultiplier[activity];

    const trackRef = db.collection("track").doc(uid);
    const doc = await trackRef.get();
    const id = generateId();
    const timestamp = FieldValue.serverTimestamp();
    if (!doc.exists) {
      await trackRef.set({
        [category]: [{ activity, amount, emission, id, timestamp }],
      });
    } else {
      await trackRef.update({
        [category]: FieldValue.arrayUnion({
          activity,
          amount,
          emission,
          id,
          timestamp,
        }),
      });
    }

    res.status(201).json({
      message: "Success",
      data: { activity, amount, emission, category, id, timestamp },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const getTrack = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const track = await db.collection("track").doc(uid).get();
    console.log(track.data());
    res.status(201).json(track.data());
  } catch (error) {
    return res.status(400).json(error);
  }
};
