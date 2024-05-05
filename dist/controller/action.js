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
exports.getLoggedAction = exports.logAction = exports.getActions = exports.addAction = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firebase_1 = require("../lib/firebase");
const calculatePoint_1 = require("../lib/calculatePoint");
const generateId_1 = __importDefault(require("../lib/generateId"));
const addAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { uid, email } = req.user!;
        const { sdg, description, emission, title, category } = req.body;
        const action = yield firebase_1.db.collection("action").add({
            sdg,
            description,
            emission,
            title,
            category,
            point: (0, calculatePoint_1.calculatePoint)(emission),
            timestamp: firestore_1.FieldValue.serverTimestamp(),
        });
        console.log(action.get());
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.addAction = addAction;
const getActions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actionsSnapshot = yield firebase_1.db.collection("action").get();
        res.status(201).json(actionsSnapshot.docs.map((doc) => {
            return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
        }));
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getActions = getActions;
const logAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { emission, title, category, point, id } = req.body;
        console.log(emission, uid);
        const actionRef = firebase_1.db.collection("actionLog").doc(uid);
        const doc = yield actionRef.get();
        const logId = (0, generateId_1.default)();
        const timestamp = firestore_1.Timestamp.now();
        if (!doc.exists) {
            console.log(logId);
            yield actionRef.set({
                carbonSaved: emission,
                pointsEarned: point,
                actions: [
                    { actionId: id, title, id: logId, emission, category, timestamp },
                ],
            });
        }
        else {
            console.log("exist");
            yield actionRef.update({
                carbonSaved: firestore_1.FieldValue.increment(emission),
                pointsEarned: firestore_1.FieldValue.increment(point),
                actions: firestore_1.FieldValue.arrayUnion({
                    actionId: id,
                    title,
                    id: logId,
                    emission,
                    category,
                    timestamp,
                }),
            });
        }
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.logAction = logAction;
const getLoggedAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const actionRef = firebase_1.db.collection("actionLog").doc(uid);
        const doc = yield actionRef.get();
        res.status(201).json({ message: "Success", data: doc.data() });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getLoggedAction = getLoggedAction;
