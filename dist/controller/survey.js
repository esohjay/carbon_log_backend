"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurvey = exports.createSurvey = void 0;
const firebase_1 = require("../lib/firebase");
const calculateCfactor_1 = require("../lib/calculateCfactor");
const surveyData_1 = require("../lib/surveyData");
const createSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, email } = req.user;
        const { householdSize, energy, flight, car, bike, publicTransport, diet, goodsConsumption, servicesConsumption, } = req.body;
        const setHouseholdSize = householdSize === 0 ? 1 : householdSize;
        const dietFootprint = surveyData_1.dietaryCF[diet] * 365;
        const energyFootprint = (0, calculateCfactor_1.calculateEnergy)(energy, surveyData_1.energyCF);
        const carFootprint = (0, calculateCfactor_1.calculateCar)(car, surveyData_1.carSizeCF);
        const flightFootprint = (0, calculateCfactor_1.calculateFlight)(flight, surveyData_1.flightCF);
        const bikeFootprint = (0, calculateCfactor_1.calculateBike)(bike, surveyData_1.motorBikeCF);
        const publicTransportFootprint = (0, calculateCfactor_1.calculatePublicTransport)(publicTransport, surveyData_1.publicTransportCF);
        const goodsAndServicesFootprint = (0, calculateCfactor_1.calculateGoodsAndServices)(Object.assign(Object.assign({}, goodsConsumption), servicesConsumption), surveyData_1.priceMultiplier);
        const homeEmission = energyFootprint / setHouseholdSize;
        const shoppingEmission = goodsAndServicesFootprint / setHouseholdSize;
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
        const surveyRef = firebase_1.db.collection("profile").doc(uid).collection("survey");
        yield surveyRef.doc(uid).set({
            survey: Object.assign({}, req.body),
            totalEmission,
            emissionCategory: {
                home: homeEmission,
                shopping: shoppingEmission,
                diet: dietFootprint,
                travel: travelEmission,
            },
        }, { merge: true });
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
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.createSurvey = createSurvey;
const getSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const surveyRef = yield firebase_1.db
            .collection("profile")
            .doc(uid)
            .collection("survey")
            .doc(uid)
            .get();
        res.status(201).json(surveyRef.data());
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getSurvey = getSurvey;
