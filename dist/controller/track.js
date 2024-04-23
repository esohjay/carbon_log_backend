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
exports.addActivity = void 0;
const firebase_1 = require("../lib/firebase");
const surveyData_1 = require("../lib/surveyData");
const firestore_1 = require("firebase-admin/firestore");
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { activity, amount, category } = req.body;
        const emission = amount * surveyData_1.priceMultiplier[activity];
        const trackRef = firebase_1.db.collection("track").doc(uid);
        const doc = yield trackRef.get();
        if (!doc.exists) {
            yield trackRef.set({
                [category]: [{ activity, amount, emission }],
            });
        }
        else {
            yield trackRef.update({
                [category]: firestore_1.FieldValue.arrayUnion({ activity, amount, emission }),
            });
        }
        res.status(201).json({
            message: "Success",
            data: { activity, amount, emission },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.addActivity = addActivity;
