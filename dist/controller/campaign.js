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
exports.deleteCampaign = exports.updateCampaign = exports.getJoinedCampaigns = exports.getCampaign = exports.getCampaigns = exports.getConversation = exports.conversation = exports.leaveCampaign = exports.joinCampaign = exports.createCampaign = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firebase_1 = require("../lib/firebase");
const deletionHelper_1 = require("../lib/deletionHelper");
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
        const { uid, name } = req.user;
        console.log(req.user);
        const { campaignId } = req.params;
        const messageRef = firebase_1.db
            .collection("campaign")
            .doc(campaignId)
            .collection("messages");
        yield messageRef.add({
            sender: { id: uid, name },
            message: req.body.message,
            timestamp: firestore_1.Timestamp.now(),
        });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.conversation = conversation;
const getConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, displayName } = req.user;
        const { campaignId } = req.params;
        const messageRef = yield firebase_1.db
            .collection("campaign")
            .doc(campaignId)
            .collection("messages")
            .get();
        res.status(201).json(messageRef.docs.map((doc) => {
            return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
        }));
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getConversation = getConversation;
const getCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaignsSnapshot = yield firebase_1.db.collection("campaign").get();
        res.status(201).json(campaignsSnapshot.docs.map((doc) => {
            return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
        }));
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getCampaigns = getCampaigns;
const getCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const campaignsSnapshot = yield firebase_1.db
            .collection("campaign")
            .doc(campaignId)
            .get();
        res.status(201).json(campaignsSnapshot.data());
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getCampaign = getCampaign;
const getJoinedCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const campaignsSnapshot = yield firebase_1.db
            .collection("campaign")
            .where("users", "array-contains", uid)
            .get();
        res.status(201).json(campaignsSnapshot.docs.map((doc) => {
            return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
        }));
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getJoinedCampaigns = getJoinedCampaigns;
const updateCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const campaignRef = firebase_1.db.collection("campaign").doc(campaignId);
        yield campaignRef.update(Object.assign({}, req.body));
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.updateCampaign = updateCampaign;
const deleteCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const campaignRef = firebase_1.db.collection("campaign").doc(campaignId);
        yield campaignRef.delete();
        yield (0, deletionHelper_1.deleteCollection)(`/campaign/${campaignId}/messages`, 100);
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.deleteCampaign = deleteCampaign;
