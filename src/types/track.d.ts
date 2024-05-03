import {
  priceMultiplier,
  flightCF,
  publicTransportCF,
} from "../lib/surveyData";
import { TransportResponse, CarData, BikeData } from "./surveyResponse";
export interface ActivityResponse {
  activity: keyof typeof priceMultiplier;
  category: string;
  amount: number;
}
export interface FlightResponse {
  trip: "oneWay" | "return";
  distance: keyof typeof flightCF;
}

export interface PublicTransportResponse {
  transportMode: keyof typeof publicTransportCF;
  unit: keyof typeof publicTransportCF.bus;
  distance: number;
}

export interface TravelResponse {
  flight?: FlightResponse;
  car?: CarData;
  bike?: BikeData;
  publicTransport?: PublicTransportResponse;
}

export type TravelArgs = {
  uid: string;
  value: number | string;
  emission: number;
  unit: string | null;
  mode: "car" | "publicTransport" | "bike" | "flight";
  id?: string;
};
