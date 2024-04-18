enum GoodType {
  clothingMaterials = "clothingMaterials",
  shoesAndFootwear = "shoesAndFootwear",
  furniture = "furniture",
  pharmaceuticalProducts = "pharmaceuticalProducts",
  booksAndNewspapers = "booksAndNewspapers",
  petFood = "petFood",
  tobacco = "tobacco",
  alcohol = "alcohol",
  gamesOrToyOrHobbies = "gamesOrToyOrHobbies",
  householdAppliances = "householdAppliances",
}

enum ServiceType {
  medicalServices = "medicalServices",
  education = "education",
  veterinaryServices = "veterinaryServices",
  financialServices = "financialServices",
  saloonAndGrooming = "saloonAndGrooming",
}
enum DietEnum {
  highMeatEater,
  mediumMeatEater,
  lowMeatEater,
  fishEater,
  vegetarian,
  vegan,
}
export interface GoodsAndServices {
  [key: string]: {
    value: string;
    period: string;
  };
}
export interface SurveyResponse {
  householdSize: number;
  energy: {
    electricity: {
      value: string;
      unit: string;
    };
    gas: {
      value: string;
      unit: string;
    };
    coal: {
      value: string;
      unit: string;
    };
    lpg: {
      value: string;
      unit: string;
    };
    propane: {
      value: string;
      unit: string;
    };
    wood: {
      value: string;
      unit: string;
    };
  };
  flight: {
    withRf: {
      domestic: string;
      shortHaul: string;
      longHaul: string;
    };
    withoutRf: {
      domestic: string;
      shortHaul: string;
      longHaul: string;
    };
  };
  car: CarData[]; // Array of CarData objects
  bike: BikeData[]; // Array of BikeData objects
  publicTransport: TransportResponse;
  diet: keyof typeof DietEnum;
  goodsConsumption: GoodsAndServices;
  servicesConsumption: GoodsAndServices;
}

enum FuelType {
  petrol,
  diesel,
  hybrid,
  pluginHybrid,
  batteryHybrid,
  unknown,
  lpg,
  cng,
}
enum MotorSize {
  small,
  medium,
  large,
  average,
}
export interface CarData {
  period: "yearly" | "monthly";
  unit: "km" | "mile";
  value: string;
  size: keyof typeof MotorSize;
  fuelType: keyof typeof FuelType;
}
export interface BikeData {
  period: "yearly" | "monthly";
  unit: "km" | "mile";
  value: string;
  size: keyof typeof MotorSize;
}

export interface EnergyResponse {
  [key: string]: {
    value: string;
    unit: string;
  };
}
export interface EnergyCF {
  [key: string]: {
    units: {
      [unit: string]: number;
    };
  };
}

type distanceUnit = {
  km: number;
  mile: number;
};
export interface CarType {
  [key: string]: {
    fuelType: {
      [key in keyof typeof FuelType]: distanceUnit;
    };
  };
}
export interface BikeType {
  [key: string]: distanceUnit;
}
export interface TransportCF {
  [key: string]: distanceUnit;
  //   coach: distanceUnit;
  //   train: distanceUnit;
}

export interface TransportResponse {
  [key: string]: {
    value: string;
    unit: "km" | "mile";
    period: string;
  };
  //   train: {
  //     value: string;
  //     unit: string;
  //     period: string;
  //   };
  //   coach: {
  //     value: string;
  //     unit: string;
  //     period: string;
  //   };
}

export interface Flight {
  domestic: number | string;
  shortHaul: number | string;
  longHaul: number | string;
}
