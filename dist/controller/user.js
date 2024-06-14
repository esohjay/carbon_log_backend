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
exports.getUser = exports.deleteUser = exports.updatePassword = exports.updateUser = exports.createUser = void 0;
const firebase_1 = require("../lib/firebase");
const deletionHelper_1 = require("../lib/deletionHelper");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { uid, email } = req.user!;
        const { fullName, email, password } = req.body;
        let userNames = [""];
        if (typeof fullName === "string") {
            userNames = fullName.split(" ");
        }
        let firebaseUser;
        // console.log(userNames[0], uid);
        try {
            firebaseUser = yield firebase_1.auth.createUser({
                displayName: userNames[0],
                email,
                password,
                disabled: false,
            });
        }
        catch (error) {
            return res.status(400).json(error);
        }
        if (firebaseUser) {
            const user = yield firebase_1.db.collection("profile").doc(firebaseUser.uid).set({
                email,
                firstName: userNames[0],
                fullName,
            });
        }
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { fullName, email } = req.body;
        let userNames = [""];
        if (typeof fullName === "string") {
            userNames = fullName.split(" ");
        }
        console.log({
            email,
            firstName: userNames[0],
            fullName,
        });
        yield firebase_1.auth.updateUser(uid, { displayName: userNames[0], email });
        yield firebase_1.db.collection("profile").doc(uid).update({
            email,
            firstName: userNames[0],
            fullName,
        });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.updateUser = updateUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const { password } = req.body;
        yield firebase_1.auth.updateUser(uid, { password });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        yield firebase_1.auth.deleteUser(uid);
        yield firebase_1.db.collection("profile").doc(uid).delete();
        yield firebase_1.db
            .collection("profile")
            .doc(uid)
            .collection("survey")
            .doc(uid)
            .delete();
        yield (0, deletionHelper_1.deleteCollection)(`/profile/${uid}/action-log`, 100);
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.user;
        const user = yield firebase_1.db.collection("profile").doc(uid).get();
        res.status(201).json(user.data());
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getUser = getUser;
