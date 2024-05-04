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
exports.getActions = exports.addAction = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firebase_1 = require("../lib/firebase");
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
