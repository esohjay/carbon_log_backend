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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrack = exports.addActivity = exports.addTravelActivity = void 0;
const firebase_1 = require("../lib/firebase");
const handleTravel_1 = require("../lib/handleTravel");
const generateId_1 = __importDefault(require("../lib/generateId"));
const surveyData_1 = require("../lib/surveyData");
const calculateCfactor_1 = require("../lib/calculateCfactor");
const firestore_1 = require("firebase-admin/firestore");
const surveyData_2 = require("../lib/surveyData");
const addTravelActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { flight, publicTransport, car, bike } = req.body;
        let data;
        let emission = 0;
        if (flight) {
            const { trip, distance } = flight;
            if (trip === "return") {
                emission += surveyData_1.flightCF[distance] * surveyData_2.averageFlightDistance[distance] * 2;
            }
            else {
                emission += surveyData_1.flightCF[distance] * surveyData_2.averageFlightDistance[distance];
            }
            data = yield (0, handleTravel_1.handleTravel)({
                emission,
                value: distance,
                mode: "flight",
                unit: null,
                uid,
            });
        }
        if (publicTransport) {
            const { distance, unit, transportMode } = publicTransport;
            emission += surveyData_1.publicTransportCF[transportMode][unit] * distance;
            data = yield (0, handleTravel_1.handleTravel)({
                emission,
                value: distance,
                mode: "publicTransport",
                unit,
                uid,
            });
        }
        if (car) {
            emission += (0, calculateCfactor_1.calculateCar)([car], surveyData_1.carSizeCF);
            data = yield (0, handleTravel_1.handleTravel)({
                emission,
                value: car.value,
                mode: "car",
                unit: car.unit,
                uid,
            });
        }
        if (bike) {
            emission += (0, calculateCfactor_1.calculateBike)([bike], surveyData_1.motorBikeCF);
            data = yield (0, handleTravel_1.handleTravel)({
                emission,
                value: bike.value,
                mode: "bike",
                unit: bike.unit,
                uid,
            });
        }
        res.status(201).json({
            message: "Success",
            data: Object.assign(Object.assign({}, data), { category: "travel" }),
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.addTravelActivity = addTravelActivity;
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { activity, amount, category } = req.body;
        const emission = amount * surveyData_1.priceMultiplier[activity];
        const trackRef = firebase_1.db.collection("track").doc(uid);
        const doc = yield trackRef.get();
        const id = (0, generateId_1.default)();
        const timestamp = firestore_1.FieldValue.serverTimestamp();
        if (!doc.exists) {
            yield trackRef.set({
                [category]: [{ activity, amount, emission, id, timestamp }],
            });
        }
        else {
            yield trackRef.update({
                [category]: firestore_1.FieldValue.arrayUnion({
                    activity,
                    amount,
                    emission,
                    id,
                    timestamp,
                }),
            });
        }
        res.status(201).json({
            message: "Success",
            data: { activity, amount, emission, category, id, timestamp },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.addActivity = addActivity;
const getTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const track = yield firebase_1.db.collection("track").doc(uid).get();
        console.log(track.data());
        res.status(201).json(track.data());
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getTrack = getTrack;
