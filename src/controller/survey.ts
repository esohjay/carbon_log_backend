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
    const returnFlightFootprint = calculateFlight(
      flight.withRf,
      flightCF.withRF
    );
    const oneWayFlightFootprint = calculateFlight(
      flight.withoutRf,
      flightCF.withoutRF
    );
    const bikeFootprint = calculateBike(bike, motorBikeCF);
    const publicTransportFootprint = calculatePublicTransport(
      publicTransport,
      publicTransportCF
    );
    const goodsAndServicesFootprint = calculateGoodsAndServices(
      { ...goodsConsumption, ...servicesConsumption },
      priceMultiplier
    );
    res
      .status(201)
      .json({
        message: "Success",
        footprint: {
          energyFootprint,
          carFootprint,
          bikeFootprint,
          returnFlightFootprint,
          oneWayFlightFootprint,
          dietFootprint,
          publicTransportFootprint,
          goodsAndServicesFootprint,
        },
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};
