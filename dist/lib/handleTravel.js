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
exports.handleTravel = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firebase_1 = require("../lib/firebase");
const generateId_1 = __importDefault(require("./generateId"));
const handleTravel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, emission, unit, mode, value } = data;
    const trackRef = firebase_1.db.collection("track").doc(uid);
    const doc = yield trackRef.get();
    const id = (0, generateId_1.default)();
    const timestamp = firestore_1.FieldValue.serverTimestamp();
    if (!doc.exists) {
        yield trackRef.set({
            travel: [{ value, mode, emission, id, unit, timestamp }],
        });
    }
    else {
        yield trackRef.update({
            travel: firestore_1.FieldValue.arrayUnion({
                value,
                mode,
                emission,
                id,
                unit,
                timestamp,
            }),
        });
    }
    return Object.assign(Object.assign({}, data), { id, timestamp });
});
exports.handleTravel = handleTravel;
