import {
  EnergyCF,
  EnergyResponse,
  Flight,
  CarType,
  CarData,
  BikeType,
  BikeData,
  TransportCF,
  TransportResponse,
  GoodsAndServices,
} from "../types/surveyResponse";
import { averageFlightDistance } from "./surveyData";
export const calculateEnergy = (
  surveyResponse: EnergyResponse,
  conversionFactor: EnergyCF
) => {
  const keyArrays = Object.keys(surveyResponse);
  let sum = 0;
  for (const key of keyArrays) {
    const value = surveyResponse[key].value;
    if (value !== "" && surveyResponse[key].unit !== "") {
      const unit = conversionFactor[key].units[surveyResponse[key].unit];
      sum += parseFloat(value) * unit;
    }
  }
  return sum;
};

export const calculateFlight = (surveyResponse: Flight, flightCF: Flight) => {
  let sum = 0;
  const { domestic, shortHaul, longHaul } = surveyResponse;
  const {
    domestic: domesticCF,
    shortHaul: shortHaulCF,
    longHaul: longHaulCF,
  } = flightCF;

  if (
    typeof domestic === "string" &&
    domestic !== "" &&
    typeof domesticCF === "number"
  ) {
    sum += parseFloat(domestic) * (averageFlightDistance.domestic * domesticCF);
  }
  if (
    typeof shortHaul === "string" &&
    shortHaul !== "" &&
    typeof shortHaulCF === "number"
  ) {
    sum +=
      parseFloat(shortHaul) * (averageFlightDistance.shortHaul * shortHaulCF);
  }
  if (
    typeof longHaul === "string" &&
    longHaul !== "" &&
    typeof longHaulCF === "number"
  ) {
    sum += parseFloat(longHaul) * (averageFlightDistance.longHaul * longHaulCF);
  }
  return sum;
};

export const calculateCar = (
  surveyResponse: CarData[],
  conversionFactor: CarType
) => {
  let sum = 0;
  for (const car of surveyResponse) {
    const { period, value, size, unit, fuelType } = car;
    if (period === "monthly") {
      sum +=
        parseFloat(value) *
        conversionFactor[size].fuelType[fuelType][unit] *
        12;
    } else {
      sum +=
        parseFloat(value) * conversionFactor[size].fuelType[fuelType][unit];
    }
  }
  return sum;
};
export const calculateBike = (
  surveyResponse: BikeData[],
  conversionFactor: BikeType
) => {
  let sum = 0;
  for (const bike of surveyResponse) {
    const { period, value, size, unit } = bike;
    if (period === "monthly") {
      sum += parseFloat(value) * conversionFactor[size][unit] * 12;
    } else {
      sum += parseFloat(value) * conversionFactor[size][unit];
    }
  }
  return sum;
};
export const calculatePublicTransport = (
  surveyResponse: TransportResponse,
  conversionFactor: TransportCF
) => {
  let sum = 0;
  const keyArrays = Object.keys(surveyResponse);
  for (const key of keyArrays) {
    const { period, value, unit } = surveyResponse[key];
    if (value !== "" && period !== "" && (unit === "km" || unit === "mile")) {
      if (period === "monthly") {
        sum += parseFloat(value) * conversionFactor[key][unit] * 12;
      } else {
        sum += parseFloat(value) * conversionFactor[key][unit];
      }
    }
  }
  return sum;
};
export const calculateGoodsAndServices = (
  surveyResponse: GoodsAndServices,
  conversionFactor: {
    [key: string]: number;
  }
) => {
  let sum = 0;
  const keyArrays = Object.keys(surveyResponse);
  for (const key of keyArrays) {
    const { period, value } = surveyResponse[key];
    if (value !== "" && period !== "") {
      if (period === "monthly") {
        sum += parseFloat(value) * conversionFactor[key] * 12;
      } else {
        sum += parseFloat(value) * conversionFactor[key];
      }
    }
  }
  return sum;
};
