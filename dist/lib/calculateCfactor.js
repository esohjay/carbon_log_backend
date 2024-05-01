"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGoodsAndServices = exports.calculatePublicTransport = exports.calculateBike = exports.calculateCar = exports.calculateFlight = exports.calculateEnergy = void 0;
const surveyData_1 = require("./surveyData");
const calculateEnergy = (surveyResponse, conversionFactor) => {
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
exports.calculateEnergy = calculateEnergy;
const calculateFlight = (surveyResponse, flightCF) => {
    let sum = 0;
    const { domestic, shortHaul, longHaul } = surveyResponse;
    const { domestic: domesticCF, shortHaul: shortHaulCF, longHaul: longHaulCF, } = flightCF;
    if (typeof domestic === "string" &&
        domestic !== "" &&
        typeof domesticCF === "number") {
        sum += parseFloat(domestic) * (surveyData_1.averageFlightDistance.domestic * domesticCF);
    }
    if (typeof shortHaul === "string" &&
        shortHaul !== "" &&
        typeof shortHaulCF === "number") {
        sum +=
            parseFloat(shortHaul) * (surveyData_1.averageFlightDistance.shortHaul * shortHaulCF);
    }
    if (typeof longHaul === "string" &&
        longHaul !== "" &&
        typeof longHaulCF === "number") {
        sum += parseFloat(longHaul) * (surveyData_1.averageFlightDistance.longHaul * longHaulCF);
    }
    return sum;
};
exports.calculateFlight = calculateFlight;
const calculateCar = (surveyResponse, conversionFactor) => {
    let sum = 0;
    for (const car of surveyResponse) {
        const { period, value, size, unit, fuelType } = car;
        if (period === "monthly") {
            sum +=
                parseFloat(value) *
                    conversionFactor[size].fuelType[fuelType][unit] *
                    12;
        }
        else {
            sum +=
                parseFloat(value) * conversionFactor[size].fuelType[fuelType][unit];
        }
    }
    return sum;
};
exports.calculateCar = calculateCar;
const calculateBike = (surveyResponse, conversionFactor) => {
    let sum = 0;
    for (const bike of surveyResponse) {
        const { period, value, size, unit } = bike;
        if (period === "monthly") {
            sum += parseFloat(value) * conversionFactor[size][unit] * 12;
        }
        else {
            sum += parseFloat(value) * conversionFactor[size][unit];
        }
    }
    return sum;
};
exports.calculateBike = calculateBike;
const calculatePublicTransport = (surveyResponse, conversionFactor) => {
    let sum = 0;
    const keyArrays = Object.keys(surveyResponse);
    for (const key of keyArrays) {
        const { period, value, unit } = surveyResponse[key];
        if (value !== "" && period !== "" && (unit === "km" || unit === "mile")) {
            if (period === "monthly") {
                sum += parseFloat(value) * conversionFactor[key][unit] * 12;
            }
            else {
                sum += parseFloat(value) * conversionFactor[key][unit];
            }
        }
    }
    return sum;
};
exports.calculatePublicTransport = calculatePublicTransport;
const calculateGoodsAndServices = (surveyResponse, conversionFactor) => {
    let sum = 0;
    const keyArrays = Object.keys(surveyResponse);
    for (const key of keyArrays) {
        const { period, value } = surveyResponse[key];
        if (value !== "" && period !== "") {
            if (period === "monthly") {
                sum += parseFloat(value) * conversionFactor[key] * 12;
            }
            else {
                sum += parseFloat(value) * conversionFactor[key];
            }
        }
    }
    return sum;
};
exports.calculateGoodsAndServices = calculateGoodsAndServices;
