export const energyCF = {
  lpg: {
    units: {
      tonne: 2939.36,
      litre: 1.56,
    },
  },
  gas: {
    units: {
      tonne: 2562.57,
      cubicMeter: 2.04,
      kWh: 0.18,
    },
  },
  propane: {
    units: {
      tonne: 2997.63,
      litre: 1.54,
      kWh: 0.21,
    },
  },
  coal: {
    units: {
      tonne: 2904.95,
      kWh: 0.34712,
    },
  },
  wood: {
    units: {
      tonne: 51.56192,
      kWh: 0.01074,
    },
  },
  electricity: {
    units: {
      kWh: 0.207074,
    },
  },
};

export const flightCF = {
  withRF: {
    domestic: 0.27258,
    shortHaul: 0.18592,
    longHaul: 0.26128,
  },
  withoutRF: {
    domestic: 0.26128,
    shortHaul: 0.10974,
    longHaul: 0.15423,
  },
};

export const carSizeCF = {
  small: {
    fuelType: {
      diesel: {
        km: 0.13931,
        mile: 0.2242,
      },
      petrol: {
        km: 0.1408,
        mile: 0.2266,
      },
      hybrid: {
        km: 0.10049,
        mile: 0.16173,
      },
      unknown: {
        km: 0.14037,
        mile: 0.22591,
      },
      pluginHybrid: {
        km: 0.02163,
        mile: 0.03481,
      },
      batteryHybrid: {
        km: 0,
        mile: 0,
      },
      cng: {
        km: 0.1566,
        mile: 0.25203,
      },
      lpg: {
        km: 0,
        mile: 0,
      },
    },
  },
  medium: {
    fuelType: {
      diesel: {
        km: 0.16716,
        mile: 0.26902,
      },
      petrol: {
        km: 0.17819,
        mile: 0.28676,
      },
      hybrid: {
        km: 0.10904,
        mile: 0.17549,
      },
      cng: {
        km: 0.1566,
        mile: 0.25203,
      },
      lpg: {
        km: 0.17607,
        mile: 0.28336,
      },
      unknown: {
        km: 0.17246,
        mile: 0.27754,
      },
      pluginHybrid: {
        km: 0.06144,
        mile: 0.09887,
      },
      batteryHybrid: {
        km: 0,
        mile: 0,
      },
    },
  },
  large: {
    fuelType: {
      diesel: {
        km: 0.20859,
        mile: 0.3357,
      },
      petrol: {
        km: 0.27224,
        mile: 0.43812,
      },
      hybrid: {
        km: 0.15244,
        mile: 0.2453,
      },
      cng: {
        km: 0.23845,
        mile: 0.38375,
      },
      lpg: {
        km: 0.26914,
        mile: 0.43314,
      },
      unknown: {
        km: 0.22612,
        mile: 0.36389,
      },
      pluginHybrid: {
        km: 0.07082,
        mile: 0.11397,
      },
      batteryHybrid: {
        km: 0,
        mile: 0,
      },
    },
  },
  average: {
    fuelType: {
      diesel: {
        km: 0.16983,
        mile: 0.27332,
      },
      petrol: {
        km: 0.16391,
        mile: 0.26379,
      },
      hybrid: {
        km: 0.11898,
        mile: 0.19147,
      },
      cng: {
        km: 0.17504,
        mile: 0.2817,
      },
      lpg: {
        km: 0.19704,
        mile: 0.3171,
      },
      unknown: {
        km: 0.16664,
        mile: 0.26817,
      },
      pluginHybrid: {
        km: 0.06588,
        mile: 0.10601,
      },
      batteryHybrid: {
        km: 0,
        mile: 0,
      },
    },
  },
};

export const motorBikeCF = {
  small: {
    km: 0.08319,
    mile: 0.13389,
  },
  medium: {
    km: 0.10108,
    mile: 0.16266,
  },
  large: {
    km: 0.13252,
    mile: 0.21326,
  },
  average: {
    km: 0.11367,
    mile: 0.18294,
  },
};

export const publicTransportCF = {
  bus: {
    km: 0.10254,
    mile: 0.16499,
  },
  coach: {
    km: 0.027,
    mile: 0.04344,
  },
  train: {
    km: 0.026,
    mile: 0.41834,
  },
};

export const dietaryCF = {
  highMeatEater: 7.19,
  mediumMeatEater: 5.63,
  lowMeatEater: 4.67,
  fishEater: 3.91,
  vegetarian: 3.81,
  vegan: 2.89,
};

export const priceMultiplier = {
  breadAndCereals: 0.495,
  meat: 1.618,
  fishAndSeafood: 0.135,
  clothingMaterials: 0.538,
  shoesAndFootwear: 0.279,
  waterSupply: 0.235,
  refuseCollection: 0.235,
  electricity: 1.753,
  gas: 5.749,
  furniture: 0.198,
  pharmaceuticalProducts: 1.224,
  books: 0.102,
  newspapers: 0.102,
  petFood: 1.244,
  tobacco: 0.041,
  alcohol: 0.074,
  gamesOrToyOrHobbies: 0.319,
  sportAndRecreationEquipment: 1.263,
  medicalServices: 0.378,
  education: 0.179,
  restaurant: 1.139,
  householdAppliances: 0.079,
  householdTextiles: 0.596,
  householdUtensils: 0.541,
  financialServices: 0.274,
  veterinaryServices: 0.44,
  saloonAndGrooming: 0.168,
  jeweryAndWatch: 0.168,
};
