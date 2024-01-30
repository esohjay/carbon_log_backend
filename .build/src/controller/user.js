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
exports.createUser = void 0;
const firebase_1 = require("../lib/firebase");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, email } = req.user;
        const { fullName } = req.body;
        let userNames = [""];
        if (typeof fullName === "string") {
            userNames = fullName.split(" ");
        }
        yield firebase_1.auth.updateUser(uid, { displayName: userNames[0] });
        const user = yield firebase_1.db.collection("profile").doc(uid).set({
            email,
            firstName: userNames[0],
            fullName,
        });
        res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createUser = createUser;
