import { priceMultiplier } from "../lib/surveyData";
export interface ActivityResponse {
  activity: keyof typeof priceMultiplier;
  category: string;
  amount: number;
}
