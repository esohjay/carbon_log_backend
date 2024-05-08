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
exports.conversation = exports.leaveCampaign = exports.joinCampaign = exports.createCampaign = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firebase_1 = require("../lib/firebase");
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, email } = req.user;
        const { description, title } = req.body;
        const campaign = yield firebase_1.db.collection("campaign").add({
            description,
            title,
            timestamp: firestore_1.FieldValue.serverTimestamp(),
            createdBy: uid,
            users: firestore_1.FieldValue.arrayUnion(uid),
        });
        console.log(campaign.get());
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createCampaign = createCampaign;
const joinCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { campaignId } = req.params;
        const campaignRef = firebase_1.db.collection("campaign").doc(campaignId);
        yield campaignRef.update({
            users: firestore_1.FieldValue.arrayUnion(uid),
        });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.joinCampaign = joinCampaign;
const leaveCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { campaignId } = req.params;
        const campaignRef = firebase_1.db.collection("campaign").doc(campaignId);
        yield campaignRef.update({
            users: firestore_1.FieldValue.arrayRemove(uid),
        });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.leaveCampaign = leaveCampaign;
const conversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, displayName } = req.user;
        const { campaignId } = req.params;
        const messageRef = firebase_1.db
            .collection("campaign")
            .doc(campaignId)
            .collection("messages");
        yield messageRef.add(Object.assign({ sender: { id: uid, name: displayName } }, req.body));
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.conversation = conversation;
