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
exports.createSurvey = void 0;
const firebase_1 = require("../lib/firebase");
const calculateCF_1 = require("../lib/calculateCF");
const surveyData_1 = require("../lib/surveyData");
const createSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, email } = req.user;
        const { householdSize, energy, flight, car, bike, publicTransport, diet, goodsConsumption, servicesConsumption, } = req.body;
        const dietFootprint = surveyData_1.dietaryCF[diet] * 365;
        const energyFootprint = (0, calculateCF_1.calculateEnergy)(energy, surveyData_1.energyCF);
        const carFootprint = (0, calculateCF_1.calculateCar)(car, surveyData_1.carSizeCF);
        const returnFlightFootprint = (0, calculateCF_1.calculateFlight)(flight.withRf, surveyData_1.flightCF.withRF);
        const oneWayFlightFootprint = (0, calculateCF_1.calculateFlight)(flight.withoutRf, surveyData_1.flightCF.withoutRF);
        const bikeFootprint = (0, calculateCF_1.calculateBike)(bike, surveyData_1.motorBikeCF);
        const publicTransportFootprint = (0, calculateCF_1.calculatePublicTransport)(publicTransport, surveyData_1.publicTransportCF);
        const goodsAndServicesFootprint = (0, calculateCF_1.calculateGoodsAndServices)(Object.assign(Object.assign({}, goodsConsumption), servicesConsumption), surveyData_1.priceMultiplier);
        const homeEmission = energyFootprint / householdSize;
        const shoppingEmission = goodsAndServicesFootprint / householdSize;
        const travelEmission = [
            carFootprint,
            bikeFootprint,
            returnFlightFootprint,
            oneWayFlightFootprint,
            publicTransportFootprint,
        ].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const totalEmission = [
            homeEmission,
            dietFootprint,
            travelEmission,
            shoppingEmission,
        ].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(carFootprint, bikeFootprint, returnFlightFootprint, oneWayFlightFootprint, publicTransportFootprint);
        const addSurvery = yield firebase_1.db
            .collection("profile")
            .doc(uid)
            .set({
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
