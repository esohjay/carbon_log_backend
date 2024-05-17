import { db, auth } from "../lib/firebase";
import { Request, Response } from "express";
import { SurveyResponse } from "../types/surveyResponse";
import {
  calculateEnergy,
  calculateCar,
  calculateFlight,
  calculateBike,
  calculatePublicTransport,
  calculateGoodsAndServices,
} from "../lib/calculateCfactor";
import {
  carSizeCF,
  energyCF,
  flightCF,
  priceMultiplier,
  motorBikeCF,
  publicTransportCF,
  dietaryCF,
} from "../lib/surveyData";

export const createSurvey = async (req: Request, res: Response) => {
  try {
    const { uid, email } = req.user!;
    const {
      householdSize,
      energy,
      flight,
      car,
      bike,
      publicTransport,
      diet,
      goodsConsumption,
      servicesConsumption,
    } = req.body as SurveyResponse;

    const dietFootprint = dietaryCF[diet] * 365;
    const energyFootprint = calculateEnergy(energy, energyCF);
    const carFootprint = calculateCar(car, carSizeCF);
    const flightFootprint = calculateFlight(flight, flightCF);
    const bikeFootprint = calculateBike(bike, motorBikeCF);
    const publicTransportFootprint = calculatePublicTransport(
      publicTransport,
      publicTransportCF
    );
    const goodsAndServicesFootprint = calculateGoodsAndServices(
      { ...goodsConsumption, ...servicesConsumption },
      priceMultiplier
    );
    const homeEmission = energyFootprint / householdSize;
    const shoppingEmission = goodsAndServicesFootprint / householdSize;
    const travelEmission = [
      carFootprint,
      bikeFootprint,
      flightFootprint,
      publicTransportFootprint,
    ].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalEmission = [
      homeEmission,
      dietFootprint,
      travelEmission,
      shoppingEmission,
    ].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const surveyRef = db.collection("profile").doc(uid).collection("survey");
    await surveyRef.doc(uid).set(
      {
        survey: { ...req.body },
        totalEmission,
        emissionCategory: {
          home: homeEmission,
          shopping: shoppingEmission,
          diet: dietFootprint,
          travel: travelEmission,
        },
      },
      { merge: true }
    );

    res.status(201).json({
      message: "Success",
      data: {
        totalEmission,
        emissionCategory: {
          home: homeEmission,
          shopping: shoppingEmission,
          diet: dietFootprint,
          travel: travelEmission,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const getSurvey = async (req: Request, res: Response) => {
  try {
    const { uid } = req.user!;
    const surveyRef = await db
      .collection("profile")
      .doc(uid)
      .collection("survey")
      .doc(uid)
      .get();
    res.status(201).json(surveyRef.data());
  } catch (error) {
    return res.status(400).json(error);
  }
};
